const path = require("path");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for feedback items
let feedbackItems = [];

// Routes
// Get all feedback items
app.get("/api/feedback", (req, res) => {
  res.json(feedbackItems);
});

// Add new feedback
app.post("/api/feedback", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res
      .status(400)
      .json({ error: "Please include both name and message" });
  }

  const newFeedback = {
    id: uuidv4(),
    name,
    message,
    timestamp: new Date(),
    likes: 0,
  };

  feedbackItems.push(newFeedback);
  res.status(201).json(newFeedback);
});

// Delete feedback
app.delete("/api/feedback/:id", (req, res) => {
  const { id } = req.params;
  const prevLength = feedbackItems.length;

  feedbackItems = feedbackItems.filter((item) => item.id !== id);

  if (prevLength === feedbackItems.length) {
    return res.status(404).json({ error: "Feedback not found" });
  }

  res.json({ message: "Feedback deleted successfully" });
});

// Like feedback
app.put("/api/feedback/:id/like", (req, res) => {
  const { id } = req.params;
  const feedbackItem = feedbackItems.find((item) => item.id === id);

  if (!feedbackItem) {
    return res.status(404).json({ error: "Feedback not found" });
  }

  feedbackItem.likes += 1;
  res.json(feedbackItem);
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
