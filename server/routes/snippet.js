const express = require("express");

const auth = require("../middleware/auth");
const balance = require("../middleware/balance");
const Snippet = require("../models/snippet");

const router = express.Router();

/////// Upload code route handler ///////
router.post("/upload", auth, balance, async (req, res) => {
  const snippet = new Snippet({
    ...req.body,
    author: req.user._id,
    reviewer: null,
    comments: null,
    rating: 0,
    date_accepted: null,
    date_submitted: null,
  });
  try {
    await snippet.save();
    req.user.balance -= 1;
    await req.user.save();
    res.status(201).send(snippet);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////// Retrieve code route handler ///////
router.get("/snippet", auth, async (req, res) => {
  const snippets = await Snippet.find({ author: req.user._id });
  res.send(snippets);
});

// fetch requested reviews
router.get("/requested", auth, async (req, res) => {
  try {
    const requestedReviews = await Snippet.find({ author: req.user._id })
      .populate("author", ["name"])
      .populate("reviewer", ["name"]);

    if (!requestedReviews) {
      return res.status(404).json({ message: "No requested reviews found" });
    }

    return res.status(200).json(requestedReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// fetch received reviews
router.get("/received", auth, async (req, res) => {
  try {
    const receivedReviews = await Snippet.find({
      reviewer: req.user._id,
    })
      .populate("author", ["name"])
      .populate("reviewer", ["name"]);

    if (!receivedReviews) {
      return res.status(404).json({ message: "No received reviews found" });
    }

    return res.status(200).json(receivedReviews);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// accept a review
router.patch("/accept/:review_id", auth, async (req, res) => {
  try {
    const foundSnippet = await Snippet.findById(req.params.review_id);

    if (!foundSnippet) {
      return res.status(404).json({ message: "Snippet Not Found" });
    }

    // change status and date_accepted
    foundSnippet.status = "in-review";
    foundSnippet.date_accepted = Date.now();

    await foundSnippet.save();

    return res.status(200).json(foundSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// decline a review
router.patch("/decline/:review_id", auth, async (req, res) => {
  try {
    const foundSnippet = await Snippet.findById(req.params.review_id);

    if (!foundSnippet) {
      return res.status(404).json({ message: "Snippet Not Found" });
    }

    // change status and reviewer
    foundSnippet.status = "pending";
    foundSnippet.reviewer = null;

    await foundSnippet.save();

    return res.status(200).json(foundSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// submit a comment
router.post("/comment/:review_id", auth, async (req, res) => {
  const { comment } = req.body;

  try {
    const foundSnippet = await Snippet.findById(req.params.review_id);

    if (!foundSnippet) {
      return res.status(404).json({ message: "Snippet Not Found" });
    }

    // change status, comments, data_submitted
    foundSnippet.comments = comment;
    foundSnippet.status = "completed";
    foundSnippet.date_submitted = Date.now();

    await foundSnippet.save();

    return res.status(200).json(foundSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// rating feedback
router.patch("/rating/:review_id", auth, async (req, res) => {
  const { rating } = req.body;

  try {
    const foundSnippet = await Snippet.findById(req.params.review_id);

    if (!foundSnippet) {
      return res.status(404).json({ message: "Snippet Not Found" });
    }

    foundSnippet.rating = rating;

    await foundSnippet.save();

    return res.status(200).json(foundSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
