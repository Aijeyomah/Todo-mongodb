import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import mongoose from "mongoose";

const app = express();
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(logger("dev"));
// app.use(json());
// app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const port = process.env.PORT || '3060';

app.listen(port)

export default app;
