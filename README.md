# Highscore Microservice

This microservice allows you to store and retrieve highscores for a video game.

## Communication Contract

### How to Programmatically REQUEST Data

- **Get all highscores**
  ```javascript
  fetch('http://localhost:3000/api/highscores').then(res => res.json()).then(console.log);
  ```

- **Get highscores by game mode**
  ```javascript
  fetch('http://localhost:3000/api/highscores/classic').then(res => res.json()).then(console.log);
  ```

- **Add a new highscore**
  ```javascript
  fetch('http://localhost:3000/api/highscores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: 'Dana', score: 550, gameMode: 'classic' })
  }).then(res => res.json()).then(console.log);
  ```

- **Get top N highscores**
  ```javascript
  fetch('http://localhost:3000/api/top/3').then(res => res.json()).then(console.log);
  ```

### How to Programmatically RECEIVE Data

All endpoints return JSON. Example response for `/api/highscores`:
```json
[
  {
    "id": 1,
    "player": "Alice",
    "score": 300,
    "gameMode": "classic",
    "timestamp": "2025-05-19T00:10:00Z"
  }
]
```
Parse it with `.then(res => res.json())` in JavaScript.

### UML Sequence Diagram

![UML Sequence Diagram](uml-sequence.png)

_UML sequence diagram showing:_
- Client program sends HTTP request to microservice (GET/POST)
- Microservice processes request and sends HTTP response
- Client receives and processes the JSON data

---

## Installation & Running

```bash
npm install
npm start
```

## Testing

```bash
npm test
```