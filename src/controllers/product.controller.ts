import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { products, categories } from "../db/schema";

export const getProducts = async (
  req: Request,
  res: Response
) => {

  const data = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      stock: products.stock,
      categoryId: products.categoryId,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(
      categories,
      eq(products.categoryId, categories.id)
    );

  res.json(data);

};

export const getProductById = async (
  req: Request,
  res: Response
) => {

  const id = Number(req.params.id);

  const data = await db
    .select()
    .from(products)
    .where(eq(products.id, id));

  if (!data.length) {
    return res.status(404).json({
      message: "Produk tidak ditemukan",
    });
  }

  res.json(data[0]);

};

export const createProduct = async (
  req: Request,
  res: Response
) => {

  const {
    categoryId,
    name,
    price,
    stock,
  } = req.body;

  await db.insert(products).values({
    categoryId,
    name,
    price,
    stock,
  });

  res.status(201).json({
    message: "Produk berhasil ditambahkan",
  });

};

export const updateProduct = async (
  req: Request,
  res: Response
) => {

  const id = Number(req.params.id);

  const {
    categoryId,
    name,
    price,
    stock,
  } = req.body;

  await db
    .update(products)
    .set({
      categoryId,
      name,
      price,
      stock,
    })
    .where(eq(products.id, id));

  res.json({
    message: "Produk berhasil diupdate",
  });

};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {

  const id = Number(req.params.id);

  await db
    .delete(products)
    .where(eq(products.id, id));

  res.json({
    message: "Produk berhasil dihapus",
  });

};