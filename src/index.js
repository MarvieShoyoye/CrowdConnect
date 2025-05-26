import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDb from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

//connect to database
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
