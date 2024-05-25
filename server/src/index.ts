import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";

const app = express();

app.use(express.json());
app.use(cors());
config();

const PORT = process.env.PORT || 4000;

app.use("/compiler", compilerRouter);

dbConnect();
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
