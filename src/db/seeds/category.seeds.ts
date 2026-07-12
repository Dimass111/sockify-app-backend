import { db } from "../index.js";
import { categories } from "../schema.js";

export async function seedCategory() {
  await db.insert(categories).values([
    {
      name: "Elektronik",
    },
    {
      name: "Makanan",
    },
    {
      name: "Minuman",
    },
  ]);

  console.log("Seed Category berhasil");
}