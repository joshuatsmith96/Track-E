import User from "../models/User.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const user = await User.findOne({ clerk_id: clerkId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
