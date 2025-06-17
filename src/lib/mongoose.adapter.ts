// /lib/mongoose-adapter.ts
import type {
  Adapter,
  AdapterUser,
  AdapterSession,
  AdapterAccount,
} from "@auth/core/adapters";
import { User } from "./database/models/user.model";
import { ISession, SessionModel } from "./database/models/session.model";
import { Account, IAccount } from "./database/models/account.model";

export function mongooseAdapter(): Adapter {
  return {
    async createUser(user) {
      const createdUser = await User.create(user);
      return createdUser.toObject() as AdapterUser;
    },

    async getUser(id) {
      const user = await User.findById(id).lean();
      return user as AdapterUser | null;
    },

    async getUserByEmail(email) {
      const user = await User.findOne({ email }).lean();
      return user as AdapterUser | null;
    },

    async getUserByAccount(providerAccountId) {
      const account = await Account.findOne(providerAccountId).lean() as unknown as IAccount;
      if (!account) return null;

      const user = await User.findById({ _id: account.userId }).lean();
      return user as AdapterUser | null;
    },

    async updateUser(user) {
      const updatedUser = await User.findByIdAndUpdate(user.id, user, {
        new: true,
      }).lean();

      if (!updatedUser) throw new Error("User not found");

      return updatedUser as AdapterUser;
    },

    async deleteUser(userId) {
      await Promise.all([
        User.findByIdAndDelete(userId),
        Account.deleteMany({ userId }),
        SessionModel.deleteMany({ userId }),
      ]);
    },

    async linkAccount(account) {
      await Account.create(account);
    },

    async unlinkAccount({ provider, providerAccountId }) {
      await Account.findOneAndDelete({ provider, providerAccountId });
    },

    async createSession(session) {
      const created = await SessionModel.create(session);
      return created.toObject() as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      const session = await SessionModel.findOne({ sessionToken }).lean() as unknown as ISession;
      if (!session) return null;

      const user = await User.findById(session.userId).lean();
      if (!user) return null;

      return {
        session: session as AdapterSession,
        user: user as AdapterUser,
      };
    },

    async updateSession(session) {
      const updated = await SessionModel.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        session,
        { new: true }
      ).lean();

      return updated as AdapterSession | null;
    },

    async deleteSession(sessionToken) {
      await SessionModel.findOneAndDelete({ sessionToken });
    },

    /*async createVerificationToken(token) {
      const created = await VerificationTokenModel.create(token);
      return created.toObject() as AdapterVerificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const existing = await VerificationTokenModel.findOneAndDelete({
        identifier,
        token,
      }).lean();

      return existing as AdapterVerificationToken | null;
    },*/
  };
}
