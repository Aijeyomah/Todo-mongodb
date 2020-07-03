import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import mongoose from "mongoose";

const app = express();
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
app.use(bodyParser.json());

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
