const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT_DB,
  database: process.env.DATABASE,
});

const connected = async () => {
  try {
    await db.connect();
    console.log("connecting to data base");
    return true;
  } catch (error) {
    console.log("connected Falid to data base ");
    return false;
  }
};

module.exports = { db, connected };
