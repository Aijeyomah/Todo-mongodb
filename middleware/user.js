import { User } from "../models";
import { conflictError, serverError, notFoundError } from "../utils";
import { generateCode } from "../validation/authentication";

const checkIfUserNameExist = async (req, res, next) => {
  try {
    const { username } = req.body;
    const data = await User.findOne({ username });
    if (data) {
      return conflictError(res, "username already exist");
    }
    next();
  } catch (error) {
    serverError(res, "server error");
  }
};

const checkIfEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await User.findOne({ email });
    if (data) {
      return conflictError(res, "email already exist");
    }
    next();
  } catch (error) {
    console.log(error);
    serverError(res, "server error");
  }
};

const checkIfEmailExistForLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await User.findOne({ email });
    req.userInfo = data;
    if (!data) {
      return notFoundError(res, "invalid login details");
    }
    next();
  } catch (error) {
    console.log(error);
    serverError(res, "server error");
  }
};

const checkPasswordMatch = async (req, res, next) => {
  try {
    const { _id, username, email, password } = req.userInfo;
    if (req.body.password === password) {
        const token = generateCode(_id, username, email);
        req.data = {
            data: req.userInfo,
            token
      }
    
      return next();
    }
    return notFoundError(res, "invalid login details");
  } catch (error) {
    serverError(res, "server error");
  }
};

export { checkIfEmailExist, checkIfUserNameExist, checkIfEmailExistForLogin, checkPasswordMatch };
