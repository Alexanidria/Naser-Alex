import ExcelJS from "exceljs";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234", // غيّرها حسب الإعدادات
  database: "Naser-Alex",
  port: 5432,
});


async function importExcelToPostgres() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("inventory_add.xlsx");
  const worksheet = workbook.getWorksheet(1);

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const id = row.getCell(1).value;
    const inventory_name = row.getCell(2).value;
    const add_number = row.getCell(3).value;
    const part_name = row.getCell(4).value;
    const part_number = row.getCell(5).value;
    const value = row.getCell(6).value;
    const quantity = row.getCell(7).value;
    const price_in = row.getCell(8).value;
    const total = row.getCell(9).value;
    const available = row.getCell(10).value;
    const add_date = row.getCell(11).value;
    const user_name = row.getCell(12).value;
/**
 * CREATE TABLE inventory_add (
    id int ,
    inventory_name TEXT,
    add_number TEXT,
    part_name TEXT,
    part_number TEXT,
    value text,
    quantity INT,
    price_in NUMERIC,
    total NUMERIC,
    available INT,
    add_date DATE,
    user_name TEXT
);
 */
    await pool.query(
      `INSERT INTO inventory_add 
        (id ,inventory_name,add_number , part_name,part_number,
        value, quantity,price_in,total ,available,
        add_date,user_name ) 
      VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [id ,inventory_name,add_number , part_name,part_number,
        value, quantity,price_in,total ,available,
        add_date,user_name]
    );
  }

  console.log("✅ تم إدخال البيانات بنجاح من Excel إلى PostgreSQL");
  await pool.end();
}

importExcelToPostgres().catch(console.error);
