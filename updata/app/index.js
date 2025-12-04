import express from "express";
import cors from "cors";
import multer from "multer";
import ExcelJS from "exceljs";
import { pool } from "./db_post.js";
import { connectDB } from "./db_mssql.js";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const pool_mssql = await connectDB();
const result = await pool_mssql.request().query("SELECT  * FROM [Alx_cost].[store].[Ta_TranMovHeder]");

console.log(result.recordset);

// ⚡ دالة مساعدة لإنشاء الجدول إذا لم يكن موجودًا
async function createTableIfNotExists(tableName, columns) {
  const client = await pool.connect();
  try {
    // إنشاء أعمدة حسب أسماء الأعمدة في Excel
    const columnsSql = columns
      .map((col) => `"${col}" TEXT`)
      .join(", ");

    const sql = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        ${columnsSql}
      );
    `;
    await client.query(sql);
  } finally {
    client.release();
  }
}

// ⚡ دالة لإدخال البيانات ديناميكيًا
async function insertRows(tableName, columns, rows) {
  const client = await pool.connect();
  try {
    for (const row of rows) {
      const values = columns.map((c) => row[c]);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const query = `
        INSERT INTO ${tableName} (${columns.map((c) => `"${c}"`).join(", ")})
        VALUES (${placeholders});
      `;
      await client.query(query, values);
    }
  } finally {
    client.release();
  }
}

// 📤 API رفع الملف
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    // تحويل الورقة إلى JSON
    const jsonData = XLSXtoJSON(worksheet);

    if (jsonData.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: "الملف فارغ" });
    }

    const columns = Object.keys(jsonData[0]);

    // إنشاء جدول تلقائي باسم excel_data (أو أي اسم تختاره)
    const tableName = "excel_data";
    await createTableIfNotExists(tableName, columns);

    // إدخال البيانات
    await insertRows(tableName, columns, jsonData);

    fs.unlinkSync(filePath);

    res.json({
      message: "✅ تم استيراد البيانات بنجاح",
      count: jsonData.length,
      columns,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء معالجة الملف" });
  }
});

// ⚙️ دالة لتحويل ExcelJS worksheet إلى JSON
function XLSXtoJSON(worksheet) {
  const rows = [];
  let headers = [];

  worksheet.eachRow((row, rowNumber) => {
    const values = row.values.slice(1); // استبعاد العمود الفارغ الأول
    if (rowNumber === 1) {
      headers = values.map((v) =>
        String(v).trim().replace(/\s+/g, "_").toLowerCase()
      );
    } else {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] !== undefined ? String(values[i]) : null;
      });
      rows.push(obj);
    }
  });
  return rows;
}

app.listen(5000, () => console.log("✅ الخادم يعمل على المنفذ 5000"));
