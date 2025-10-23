import Board from "../models/Board.js";
import User from "../models/User.js";

export const getBoardsForCurrentUser = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const boards = await Board.find({ users: clerkId });
    res.json(boards);
  } catch (err) {
    next(err);
  }
};

export const getBoardById = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const user = await User.findOne({ clerk_id: clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const board = await Board.findOne({
      board_id: req.params.board_id,
      board_id: { $in: user.boards },
    });

    if (!board) return res.status(404).json({ message: "Board not found" });

    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;

    const { board_id, board_name, lists } = req.body;

    const existing = await Board.findOne({ board_id });
    if (existing)
      return res.status(400).json({ message: "Board ID already exists" });

    const newBoard = await Board.create({
      board_id,
      board_name,
      lists: lists || [],
      board_creation_date: new Date(),
      board_updated_date: new Date(),
      users: [clerkId],
    });

    res.status(201).json(newBoard);
  } catch (err) {
    next(err);
  }
};

export const updateBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const { board_name, lists } = req.body;

    const updatedBoard = await Board.findOneAndUpdate(
      { board_id: req.params.board_id, users: clerkId },
      { board_name, lists, board_updated_date: new Date() },
      { new: true }
    );

    if (!updatedBoard)
      return res.status(404).json({ message: "Board not found" });

    res.json(updatedBoard);
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;

    const deletedBoard = await Board.findOneAndDelete({
      board_id: req.params.board_id,
      users: clerkId,
    });

    if (!deletedBoard)
      return res.status(404).json({ message: "Board not found" });

    res.json({ message: "Board deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const addListToBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const { list_id, list_name, list_status, list_items, order_in_board } =
      req.body;

    const board = await Board.findOne({
      board_id: req.params.board_id,
      users: clerkId,
    });

    if (!board) return res.status(404).json({ message: "Board not found" });

    const newList = {
      list_id,
      list_name,
      list_status: list_status || "NotStarted",
      list_items: list_items || [],
      order_in_board,
    };

    board.lists.push(newList);
    board.board_updated_date = new Date();
    await board.save();

    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const removeListFromBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const { list_id } = req.params;

    const board = await Board.findOne({
      board_id: req.params.board_id,
      users: clerkId,
    });

    if (!board) return res.status(404).json({ message: "Board not found" });

    const initialLength = board.lists.length;
    board.lists = board.lists.filter((list) => list.list_id !== list_id);

    if (board.lists.length === initialLength) {
      return res.status(404).json({ message: "List not found" });
    }

    board.board_updated_date = new Date();
    await board.save();

    res.json(board);
  } catch (err) {
    next(err);
  }
};

export const updateListInBoard = async (req, res, next) => {
  try {
    const clerkId = req.user.sub;
    const { list_id } = req.params;
    const { list_name, list_status, list_items, order_in_board } = req.body;

    const board = await Board.findOne({
      board_id: req.params.board_id,
      users: clerkId,
    });

    if (!board) return res.status(404).json({ message: "Board not found" });

    const list = board.lists.find((list) => list.list_id === list_id);
    if (!list) return res.status(404).json({ message: "List not found" });

    if (list_name !== undefined) list.list_name = list_name;
    if (list_status !== undefined) list.list_status = list_status;
    if (list_items !== undefined) list.list_items = list_items;
    if (order_in_board !== undefined) list.order_in_board = order_in_board;

    board.board_updated_date = new Date();
    await board.save();

    res.json(board);
  } catch (err) {
    next(err);
  }
};
