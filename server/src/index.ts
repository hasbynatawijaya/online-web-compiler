import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
config();

const PORT = process.env.PORT || 4000;

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
