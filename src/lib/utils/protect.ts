// utils/protect.ts
import { getSession } from "next-auth/react";

export const protect = async (req: any, res: any, next: any) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  req.user = session.user;
  next();
};
