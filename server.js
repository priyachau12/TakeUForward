const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "takeuforward",
  database: "flashcards_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Get all flashcards
app.get("/api/flashcards", (req, res) => {
  const query = "SELECT * FROM flashcards";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a new flashcard
app.post("/api/flashcards", (req, res) => {
  const { question, answer } = req.body;
  const query = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
  db.query(query, [question, answer], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, question, answer });
    }
  });
});

// Update a flashcard
app.put("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?";
  db.query(query, [question, answer, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a flashcard
app.delete("/api/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM flashcards WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(5012, () => {
  console.log("Server is running on port 5002");
});
