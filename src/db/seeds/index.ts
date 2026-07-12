import { seedUser } from "./user.seed.js";
import { seedCategory } from "./category.seed.js";
import { seedProduct } from "./product.seed.js";

async function main() {

  await seedUser();

  await seedCategory();

  await seedProduct();

  console.log("Semua seed berhasil");

}

main();