import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema(
  {
    list_id: {
      type: String,
      required: false,
      trim: true,
    },
    list_text: {
      type: String,
      required: true,
      trim: true,
    },
    order_in_list: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["NotComplete", "Complete", "InProgress"],
      default: "NotComplete",
    },
  },
  { _id: false }
);

const listSchema = new mongoose.Schema(
  {
    list_id: {
      type: String,
      required: true,
      trim: true,
    },
    list_name: {
      type: String,
      required: true,
      trim: true,
    },
    list_status: {
      type: String,
      enum: ["NotStarted", "InProgress", "Complete"],
      default: "NotStarted",
    },
    list_items: {
      type: [listItemSchema],
      default: [],
    },
    order_in_board: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const boardSchema = new mongoose.Schema(
  {
    board_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    board_name: {
      type: String,
      required: true,
      trim: true,
    },
    board_creation_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    board_updated_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    lists: {
      type: [listSchema],
      default: [],
    },
    users: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);
export default Board;
