import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import employeeRoute from "./routes/employee.js";

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//Global Employee Route
app.use("/api/employee", employeeRoute);

//Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
