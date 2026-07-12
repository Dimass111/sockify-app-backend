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