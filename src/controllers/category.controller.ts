import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { categories } from "../db/schema";

export const getCategories = async (
  req: Request,
  res: Response
) => {
  const data = await db.select().from(categories);

  res.json(data);
};

export const getCategoryById = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const data = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id));

  if (!data.length) {
    return res.status(404).json({
      message: "Kategori tidak ditemukan",
    });
  }

  res.json(data[0]);
};

export const createCategory = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;

  await db.insert(categories).values({
    name,
  });

  res.status(201).json({
    message: "Kategori berhasil ditambahkan",
  });
};

export const updateCategory = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const { name } = req.body;

  await db
    .update(categories)
    .set({
      name,
    })
    .where(eq(categories.id, id));

  res.json({
    message: "Kategori berhasil diupdate",
  });
};

export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  await db
    .delete(categories)
    .where(eq(categories.id, id));

  res.json({
    message: "Kategori berhasil dihapus",
  });
};