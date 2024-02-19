const express = require("express");
const issueRouter = express.Router();
const verifyToken = require("../verifyToken");
const Comment = require("../models/Comment");

const Issue = require("../models/Issue");

// get issues
issueRouter.get("/", async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const issues = await Issue.find(query.search ? searchFilter : null)
      .sort({ "votes.length": "desc" })
      .exec();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user issues
issueRouter.get("/user/:userId", async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.params.userId });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get issue details
issueRouter.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.status(200).json(issue);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
issueRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
issueRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ issueId: req.params.id });
    res.status(200).json("Issue has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// create
issueRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(200).json(savedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

issueRouter.put("/upvote/:issueId", verifyToken, async (req, res, next) => {
  const issue = await Issue.findById(req.params.issueId);
  if (!issue) {
    return res.status(404).json({ message: "Issue not found" });
  }

  if (issue.upvoted.includes(req.auth._id)) {
    return res
      .status(400)
      .json({ message: "User has already upvoted this issue" });
  }

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.issueId,
      { $inc: { upvoteCount: 1 }, $addToSet: { upvoted: req.auth._id } },
      { new: true }
    );
    res.status(201).json(updatedIssue);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

issueRouter.put("/downvote/:issueId", verifyToken, async (req, res, next) => {
  const issue = await Issue.findById(req.params.issueId);
  if (!issue) {
    return res.status(404).json({ message: "Issue not found" });
  }

  if (issue.upvoted.includes(req.auth._id)) {
    return res
      .status(400)
      .json({ message: "User has already upvoted this issue" });
  }
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $inc: { downvoteCount: 1 },
      },
      { new: true }
    );
    res.status(201).send(updatedIssue);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = issueRouter;
