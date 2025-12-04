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
const result = await pool_mssql.request().query("SELECT  * FROM TafX_OutPeriod");
console.log(result.recordset);


app.listen(5000, () => console.log("✅ الخادم يعمل على المنفذ 5000"));
