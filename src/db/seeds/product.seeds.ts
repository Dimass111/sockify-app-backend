import { db } from "../index.js";
import { products } from "../schema.js";

export async function seedProduct() {

  await db.insert(products).values([
    {
      categoryId: 1,
      name: "Laptop Asus",
      price: 10000000,
      stock: 5,
    },
    {
      categoryId: 2,
      name: "Mie Instan",
      price: 3500,
      stock: 100,
    },
  ]);

  console.log("Seed Product berhasil");

}