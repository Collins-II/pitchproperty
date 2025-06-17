export const GenderOptions = ["Male", "Female", "Other"];

export const RoleOptions = ["buyer","seller","agent","admin","moderator"]

export const UserFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  image: "",
  bgImage: "",
  bio: "",
  gender: "other",
  birthday: new Date(),

  address: {
    country: "",
    state: "",
    state_district: "",
    suburb: "",
    street: "",
    zipCode: "",
  },

  emailVerified: new Date(),
  phoneVerified: false,
  hashedPassword: "",
  loginCount: 0,
  lastLoginAt: new Date(),

  role: "buyer",
  isBusinessAccount: false,
  companyName: "",
  companyLicense: "",
  businessVerified: false,

  subscriptionPlan: "free",
  subscriptionExpiresAt: new Date(),

  kycVerified: false,
  verificationStatus: "unverified",
  identityDocument: {
    type: "national_id",
    number: "",
    fileUrl: "",
    issuedCountry: "",
    expiryDate: new Date(),
  },
  selfieUrl: "",
  verificationAttempts: 1,
  mfaEnabled: false,

  carListings: [],
  propertyListings: [],
  reservations: [],
  saveListings: [],
  favorites: [],
  reviews: [],
  preferences: {
    emailNotifications: false,
    smsNotifications: false,
    darkMode: false,
  },
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
