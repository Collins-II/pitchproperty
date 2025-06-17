import bcrypt from "bcrypt";
import { model, Schema, Types, models, Model } from "mongoose";
import { COMPANY_FROM_EMAIL, COMPANY_FROM_NAME } from "@/lib/constants";
import { sendEmail } from "@/lib/utils/mailer";

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  bgImage?: string;
  bio?: string;
  gender?: string;
  birthday?: Date;

  address?: {
    country: string;
    state: string;
    state_district?: string;
    suburb?: string;
    street?: string;
    zipCode?: string;
  };

  emailVerified?: Date;
  phoneVerified?: boolean;
  hashedPassword?: string;
  loginCount: number;
  lastLoginAt: Date;

  role: "buyer" | "seller" | "agent" | "admin" | "moderator";
  isBusinessAccount?: boolean;
  companyName?: string;
  companyLicense?: string;
  businessVerified?: boolean;

  subscriptionPlan?: "free" | "premium" | "enterprise";
  subscriptionExpiresAt?: Date;

  // Verification
  kycVerified?: boolean;
  verificationStatus?: "unverified" | "pending" | "verified" | "rejected";
  identityDocument?: {
    type: "passport" | "driver_license" | "national_id";
    number: string;
    fileUrl: string;
    issuedCountry?: string;
    expiryDate?: Date;
  };
  selfieUrl?: string;
  verificationAttempts?: number;
  mfaEnabled?: boolean;

  carListings?: Types.ObjectId[];
  propertyListings?: Types.ObjectId[];
  reservations?: Types.ObjectId[];
  saveListings?: { item: Types.ObjectId; itemType: "Car" | "Property" }[];
  favorites?: Types.ObjectId[];
  reviews?: Types.ObjectId[];

  starRating?: number;
  trustLevel?: number;

  preferences?: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    darkMode?: boolean;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

interface UserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
  add(userProps: Partial<IUser>): Promise<IUser>;
  findByIdAndUpdatePassword(userId: string, password: string): Promise<IUser>;
}

const schema = new Schema<IUser, UserModel>(
  {
    firstName: String,
    lastName: String,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true },
    image: String,
    bgImage: String,
    bio: String,
    gender: String,
    birthday: Date,

    address: {
      country: String,
      state: String,
      state_district: String,
      suburb: String,
      street: String,
      zipCode: String,
    },

    hashedPassword: String,
    emailVerified: Date,
    phoneVerified: { type: Boolean, default: false },
    loginCount: { type: Number, default: 1 },
    lastLoginAt: { type: Date, default: Date.now },

    role: {
      type: String,
      enum: ["buyer", "seller", "agent", "admin", "moderator"],
      default: "buyer",
    },
    isBusinessAccount: { type: Boolean, default: false },
    companyName: String,
    companyLicense: String,
    businessVerified: { type: Boolean, default: false },

    subscriptionPlan: {
      type: String,
      enum: ["free", "premium", "enterprise"],
      default: "free",
    },
    subscriptionExpiresAt: Date,

    // Verification & Identity
    kycVerified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["unverified", "pending", "verified", "rejected"],
      default: "unverified",
    },
    identityDocument: {
      type: {
        type: String,
        enum: ["passport", "driver_license", "national_id"],
      },
      number: String,
      fileUrl: String,
      issuedCountry: String,
      expiryDate: Date,
    },
    selfieUrl: String,
    verificationAttempts: { type: Number, default: 0 },
    mfaEnabled: { type: Boolean, default: false },

    carListings: [{ type: Types.ObjectId, ref: "Car" }],
    propertyListings: [{ type: Types.ObjectId, ref: "Property" }],
    reservations: [{ type: Types.ObjectId, ref: "Reservation" }],
    saveListings: [
      {
        item: { type: Types.ObjectId, refPath: "saveListings.itemType" },
        itemType: { type: String, enum: ["Property", "Car"], required: true },
      },
    ],
    favorites: [{ type: Types.ObjectId, ref: "Listing" }],
    reviews: [{ type: Types.ObjectId, ref: "Review" }],

    starRating: { type: Number, default: 0 },
    trustLevel: { type: Number, default: 0 },

    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      darkMode: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (this.isModified("hashedPassword") && this.hashedPassword) {
    const salt = await bcrypt.genSalt();
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
  }
  next();
});

schema.static("login", async function (email, password): Promise<IUser> {
  const user = await this.findOne({ email });

  if (user) {
    if (!user.hashedPassword) {
      throw Error("No password set, try with social provider");
    }

    const auth = await bcrypt.compare(password, user.hashedPassword);

    if (auth) {
      user.loginCount++;
      user.lastLoginAt = new Date();
      await user.save();
      return user;
    }

    throw Error("Password is incorrect");
  }

  throw Error("Email is incorrect");
});

schema.statics.add = async function (userProps: Partial<IUser>): Promise<IUser> {
  const user = await this.create(userProps);

  if (user) {
    // Send welcome email
    const mailData = {
      from: `${COMPANY_FROM_NAME} <${COMPANY_FROM_EMAIL}>`,
      to: `${user.firstName} <${user.email}>`,
      subject: "Welcome to YouSell",
      text: `Hi ${user.firstName}, welcome to QuickSell! You've signed up with email ${user.email}`,
      html: `<p>Hi <strong>${user.firstName}</strong>,</p><p>Welcome to QuickSell! You've signed up with email ${user.email}</p>`,
    };

    sendEmail(mailData);

    return user;
  }

  throw Error("Account cannot be created");
};

schema.statics.findByIdAndUpdatePassword = async function (
  userId: string,
  password: string
): Promise<IUser> {
  const user = await this.findById(userId);

  if (user) {
    user.hashedPassword = password;
    await user.save();
    return user;
  }

  throw Error("User cannot be found");
};

export const User =
  (models.User as UserModel) || model<IUser, UserModel>("User", schema);
