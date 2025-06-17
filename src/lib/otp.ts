import ChallengeEmail from "../../emails/challenge";
import { bcryptPasswordCompare, bcryptPasswordHash } from "./bcrypt";
import { redis } from "./redis-store";
import { resend } from "./resend";
import { SessionModel } from "./database/models/session.model";

const REDIS_PREFIX = "otp";

// Helper to issue a new 2FA challenge and send via email
export async function issueChallenge(userId: string, email: string) {
	const array = new Uint32Array(1);
	const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
	const hash = await bcryptPasswordHash(code.toString());
	const challenge = { codeHash: hash, email };

	await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 10 * 60, challenge);

	const { error } = await resend.emails.send({
		from: process.env.FROM_EMAIL_ADDRESS as string,
		to: email,
		subject: `Sign in to ${process.env.NEXT_PUBLIC_APP_URL}`,
		react: ChallengeEmail({ data: { code } }),
	});

	if (error) {
		console.log({ error });
		throw new Error(`Error sending email: ${error.name} - ${error.message}`);
	}
}

interface Challenge {
	codeHash: string;
	email: string;
}

// Check user-submitted challenge code and update session
export async function completeChallenge(userId: string, code: string) {
	const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);

	if (!challenge) {
		return {
			succcess: false,
			message: "Challenge does not exist - please try again",
		};
	}

	const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
	if (!isCorrect) {
		return {
			succcess: false,
			message: "Incorrect verification code - please try again",
		};
	}

	const session = await SessionModel.findOne({
		userId,
		requires2FA: true,
	});

	if (!session) {
		return {
			succcess: false,
			message: "Could not find the session for the user",
		};
	}

	await SessionModel.updateMany(
		{ sessionToken: session.sessionToken, userId },
		{ $set: { requires2FA: false } }
	);

	await redis.del(`${REDIS_PREFIX}:uid-${userId}`);

	return { success: true, message: "2FA enabled successfully" };
}
