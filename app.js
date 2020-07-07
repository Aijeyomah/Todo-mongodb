import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();
dotenv.config();
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

const port = process.env.PORT || '3060';

app.listen(port, () => console.info(`Example app listening on port ${port}!`));


export default app;
