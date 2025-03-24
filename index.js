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
app.use("/api/employee", employeeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
