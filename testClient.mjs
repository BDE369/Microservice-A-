import fetch from 'node-fetch';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:3000';

async function getAllHighscores() {
  const res = await fetch(`${BASE_URL}/api/highscores`);
  const data = await res.json();
  console.log('\nAll Highscores:', data, '\n');
}

async function getHighscoresByMode() {
  const { mode } = await inquirer.prompt({
    type: 'input',
    name: 'mode',
    message: 'Enter game mode:'
  });
  const res = await fetch(`${BASE_URL}/api/highscores/${mode}`);
  const data = await res.json();
  console.log(`\nHighscores for mode "${mode}":`, data, '\n');
}

async function addNewHighscore() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'player', message: 'Player name:' },
    { type: 'number', name: 'score', message: 'Score:' },
    { type: 'input', name: 'gameMode', message: 'Game mode:' }
  ]);
  const res = await fetch(`${BASE_URL}/api/highscores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers)
  });
  const data = await res.json();
  console.log('\nAdded highscore:', data, '\n');
}

async function getTopHighscores() {
  const { count } = await inquirer.prompt({
    type: 'number',
    name: 'count',
    message: 'How many top scores?'
  });
  const res = await fetch(`${BASE_URL}/api/top/${count}`);
  const data = await res.json();
  console.log(`\nTop ${count} Highscores:`, data, '\n');
}

async function main() {
  while (true) {
    const { test } = await inquirer.prompt({
      type: 'list',
      name: 'test',
      message: 'Select the test you want to run:',
      choices: [
        { name: 'Get all highscores', value: 'getAll' },
        { name: 'Get highscores by game mode', value: 'byMode' },
        { name: 'Add a new highscore', value: 'addNew' },
        { name: 'Get top N highscores', value: 'topN' },
        { name: 'Exit', value: 'exit' }
      ]
    });

    if (test === 'getAll') await getAllHighscores();
    else if (test === 'byMode') await getHighscoresByMode();
    else if (test === 'addNew') await addNewHighscore();
    else if (test === 'topN') await getTopHighscores();
    else if (test === 'exit') break;
  }
}

main();