import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../db";
import { users } from "../db/schema";

const SECRET_KEY = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (checkUser.length > 0) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
    success: true,
    message: "Register berhasil",
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      return res.status(404).json({
        message: "Email tidak ditemukan",
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json({
    success: true,
    message: "Login berhasil",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    });

  } catch (error) {
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
    error,
  });
}
};