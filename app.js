const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory highscore data
let highscores = [
  { id: 1, player: 'Alice', score: 300, gameMode: 'classic', timestamp: '2025-05-19T00:10:00Z' },
  { id: 2, player: 'Bob', score: 450, gameMode: 'arcade', timestamp: '2025-05-19T00:11:00Z' }
];

// Get all highscores
app.get('/api/highscores', (req, res) => {
  res.json(highscores);
});

// Get highscores by game mode
app.get('/api/highscores/:gameMode', (req, res) => {
  const { gameMode } = req.params;
  const filtered = highscores.filter(s => s.gameMode === gameMode);
  res.json(filtered);
});

// Add new highscore
app.post('/api/highscores', (req, res) => {
  const { player, score, gameMode } = req.body;
  if (!player || !score || !gameMode) {
    return res.status(400).json({ error: "player, score, and gameMode required" });
  }
  const newScore = {
    id: highscores.length + 1,
    player,
    score,
    gameMode,
    timestamp: new Date().toISOString()
  };
  highscores.push(newScore);
  res.status(201).json(newScore);
});

// Get top N highscores
app.get('/api/top/:count', (req, res) => {
  const count = parseInt(req.params.count);
  const sorted = [...highscores].sort((a, b) => b.score - a.score).slice(0, count);
  res.json(sorted);
});

app.listen(port, () => {
  console.log(`Highscore microservice running at http://localhost:${port}`);
});