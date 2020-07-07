import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateCode = (_id, username, email) => {
  const key = process.env.SECRET_KEY;
  const token = jwt.sign({ _id, username, email }, key, {
    expiresIn: "1h",
  });
  return token;
};

export const isTokenPresent = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({
      message: "You have to be signed in",
    });
  } else {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(err);
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};


