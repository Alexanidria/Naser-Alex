import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234", // عدّل حسب إعدادك
  database: "Naser-Alex", // اسم قاعدة البيانات
  port: 5432,
});
