import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { getUserByEmail } from "./db/users.js";

const secret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    res.status(401);
    return;
  }

  const claims = { sub: user.id, email: user.email };
  const token = jwt.sign(claims, secret);
  res.status(200).json({ token });
  return;
}
