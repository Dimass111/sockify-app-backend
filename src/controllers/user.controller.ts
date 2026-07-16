import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

import { db } from "../db";
import { users } from "../db/schema";


export const getUsers = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await db.select().from(users);

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan",
            error,
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const data = await db
        .select()
        .from(users)
        .where(eq(users.id, id));

    if (!data.length) {
        return res.status(404).json({
            message: "User tidak ditemukan",
        });
    }

    res.json(data[0]);
};

export const createUser = async (
    req: Request,
    res: Response
) => {

    const {
        name,
        email,
        password,
        role,
    } = req.body;

    // Tambahkan baris ini
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json({
        message: "User berhasil ditambahkan",
    });

};

export const updateUser = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const {
    name,
    email,
    password,
    role,
} = req.body;

    await db
    .update(users)
    .set({

    name,
    email,
    password,
    role,

    })
    .where(eq(users.id, id));

    res.json({
    message: "User berhasil diupdate",
    });
};

export const deleteUser = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    await db.delete(users)
        .where(eq(users.id, id));

    res.json({
        message: "User berhasil dihapus",
    });
};