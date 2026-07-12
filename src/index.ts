import "dotenv/config";
import express from 'express';
import { sql } from 'drizzle-orm';
// import mahasiswaRoutes from './routes/mahasiswaRoutes.js';
import { db } from './db/index.js';
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    return res.json({ status: 'ok' });
  } catch {
    return res.status(500).json({ status: 'error' });
  }
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});