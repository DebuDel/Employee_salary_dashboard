import pg from "pg";
import env from "dotenv";

env.config();
pg.defaults.ssl = true;

const requiredEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_PASSWORD",
  "PG_DB",
  "PG_PORT",
];
