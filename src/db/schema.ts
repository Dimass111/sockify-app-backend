import {
  mysqlTable,
  int,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  email: varchar("email", {
    length: 100,
  }).notNull().unique(),

  password: varchar("password", {
    length: 255,
  }).notNull(),

  role: varchar("role", {
    length: 20,
  })
    .default("user")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),

  categoryId: int("category_id")
    .references(() => categories.id)
    .notNull(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  price: int("price").notNull(),

  stock: int("stock")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});