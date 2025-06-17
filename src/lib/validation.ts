import { z } from "zod";

export const UserFormValidation = z.object({
  // Basic Info
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((val) => /^\+\d{10,15}$/.test(val), {
      message: "Phone must be in E.164 format (e.g., +1234567890)",
    }),
  image: z.string().url(),
  bgImage: z.string().url(),
  bio: z.string().max(500),
  gender: z.enum(["male", "female", "other"]),
  birthday: z.coerce.date(),

  // Address
  address: z
    .object({
      country: z.string(),
      state: z.string(),
      state_district: z.string(),
      suburb: z.string(),
      street: z.string(),
      zipCode: z.string(),
    })
    ,

  // Verification and Login
  emailVerified: z.coerce.date(),
  phoneVerified: z.boolean(),
  hashedPassword: z.string(),

  // Roles & Business Info
  role: z.enum(["buyer", "seller", "agent", "admin", "moderator"]),
  isBusinessAccount: z.boolean(),
  companyName: z.string(),
  companyLicense: z.string(),
  businessVerified: z.boolean(),

  // Subscription
  subscriptionPlan: z.enum(["free", "premium", "enterprise"]),
  subscriptionExpiresAt: z.coerce.date(),

  // KYC Verification
  kycVerified: z.boolean(),
  verificationStatus: z
    .enum(["unverified", "pending", "verified", "rejected"])
    ,
  identityDocument: z
    .object({
      type: z.enum(["passport", "driver_license", "national_id"]),
      number: z.string(),
      fileUrl: z.string().url(),
      issuedCountry: z.string(),
      expiryDate: z.coerce.date(),
    })
    ,
  selfieUrl: z.string().url(),
  verificationAttempts: z.number().int(),
  mfaEnabled: z.boolean(),

  // Preferences
  preferences: z
    .object({
      emailNotifications: z.boolean(),
      smsNotifications: z.boolean(),
      darkMode: z.boolean(),
    })
    ,
});


export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
