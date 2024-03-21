import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
}).promise();

async function getMessags() {
  const [result] = await pool.query(`SELECT * FROM messages ;`);
  return result;
}

async function getMessag(id) {
  const [result] = await pool.query(`SELECT * FROM messages WHERE id = ? ;`, [
    id,
  ]);
  return result[0];
}

async function creatMessage(messaage) {
  const [result] = await pool.query("INSERT INTO messages (mes) VALUES (?)", [
    messaage,
  ]);
  return result.insertId;
}

async function deletMessage(id) {
  const [result] = await pool.query(
    "DELETE FROM `messages` WHERE `messages`.`id` = ?",
    [id]
  );
  return result.affectedRows;
}

async function updateMessage(id, messaage) {
  const [result] = await pool.query(
    " UPDATE messages SET mes = ?  WHERE id = ?;",
    [messaage, id]
  );
  return result.affectedRows;
}

export { getMessag, getMessags, creatMessage, updateMessage, deletMessage };
