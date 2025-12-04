import sql from "mssql";

const config = {
  user: "qwe",
  password: "1234",
  server: "localhost",
  database: "Alx_cost",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
