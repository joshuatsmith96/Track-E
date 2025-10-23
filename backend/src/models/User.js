import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerk_id: { type: String, required: true, unique: true, trim: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
