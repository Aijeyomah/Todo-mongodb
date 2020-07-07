import { User } from "../models";
import { createdOkResponse, successResponse } from "../utils";

const register = async (req, res) => {
  const newUser = new User({ ...req.body });
  await newUser.save();
  return createdOkResponse(res, newUser, "user created successfully");
};

const userLogin = async (req, res) => {

  return successResponse(res, req.data, "Login successful");
};

export { register, userLogin };
