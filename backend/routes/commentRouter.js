const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// get comments
commentRouter.get("/issue/:issueId", async (req, res) => {
  try {
    const comments = await Comment.find({ issueId: req.params.issueId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
commentRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
commentRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// create
commentRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = commentRouter;
