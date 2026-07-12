import { db } from "../index.js";
import { users } from "../schema.js";

export async function seedUser() {
  await db.insert(users).values([
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
    },
    {
      name: "Budi",
      email: "budi@gmail.com",
      password: "123456",
    },
  ]);

  console.log("Seed user berhasil");
}