import pg from "pg";
import env from "dotenv";

env.config();

const requiredEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_PASSWORD",
  "PG_DB",
  "PG_PORT",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`Missing Environment variable ${varName}`);
    process.exit(1);
  }
});

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log("Couldn't connect with the database", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.log("Unexpected error on idle client", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
