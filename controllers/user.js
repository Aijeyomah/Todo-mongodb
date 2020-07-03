import { User } from "../models";

const register = async (req, res, next) => {
    console.log(req.body);
  const { email, username } = req.body;
  const userEmail = await User.find({ email });
  console.log(userEmail);
  
  const userName = await User.findOne({ username });
  if (userName || userEmail) {
    return res
      .status(409)
      .json({ status: "fail", message: "User exists already" });
  }

  const newUser = new User({ ...req.body });
  await newUser.save();
  return res
    .status(201)
    .json({ status: "success", message: "User successfully created" });
};

export { register };
