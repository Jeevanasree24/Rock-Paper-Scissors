import React, { useState } from 'react';
import './App.css';

import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';

const choices = [
  { name: 'rock', img: rockImg },
  { name: 'paper', img: paperImg },
  { name: 'scissors', img: scissorsImg }
];

function getResult(user, computer) {
  if (user === computer) return "It's a tie!";
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) return 'You win!';
  return 'You lose!';
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [history, setHistory] = useState([]);

  const play = (choice) => {
    const compIdx = Math.floor(Math.random() * 3);
    const comp = choices[compIdx].name;
    const res = getResult(choice, comp);

    setUserChoice(choice);
    setComputerChoice(comp);
    setResult(res);

    setScore(prev => ({
      user: prev.user + (res === 'You win!' ? 1 : 0),
      computer: prev.computer + (res === 'You lose!' ? 1 : 0),
    }));

    setHistory(prev => [
      ...prev, 
      { user: choice, computer: comp, result: res }
    ]);
  };

  const resetGame = () => {
    setUserChoice('');
    setComputerChoice('');
    setResult('');
    setScore({ user: 0, computer: 0 });
    setHistory([]);
  };

  const getImage = (choiceName) => {
    const found = choices.find(c => c.name === choiceName);
    return found ? found.img : '';
  };

  if (showWelcome) {
    return (
      <div className="welcome-container">
        <div className="welcome-box">
          <h1>Welcome to Rock Paper Scissors!</h1>
          <p>Test your luck and strategy against the computer.<br/>Are you ready to play?</p>
          <button className="start-btn" onClick={() => setShowWelcome(false)}>
            Start Game
          </button>
        </div>
        <footer>
          &copy; {new Date().getFullYear()} Rock Paper Scissors Game &mdash; Built by Jeevanasree24
        </footer>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Rock Paper Scissors</h1>
        <div className="scoreboard">
          <span>You: {score.user}</span>
          <span>Computer: {score.computer}</span>
        </div>
      </header>

      <div className="choices">
        {choices.map(choice => (
          <button
            key={choice.name}
            onClick={() => play(choice.name)}
            className="choice-btn"
            title={choice.name}
          >
            <img src={choice.img} alt={choice.name} className="choice-img" />
            <span>{choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}</span>
          </button>
        ))}
      </div>

      {result && (
        <div className="result">
          <div className="result-images">
            <div>
              <p>Your choice:</p>
              {userChoice && <img src={getImage(userChoice)} alt={userChoice} className="result-img" />}
              <div className="choice-label">{userChoice}</div>
            </div>
            <div>
              <p>Computer's choice:</p>
              {computerChoice && <img src={getImage(computerChoice)} alt={computerChoice} className="result-img" />}
              <div className="choice-label">{computerChoice}</div>
            </div>
          </div>
          <h2>{result}</h2>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>Round History</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>You</th>
                <th>Computer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((round, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={getImage(round.user)} alt={round.user} className="history-img" /> {round.user}
                  </td>
                  <td>
                    <img src={getImage(round.computer)} alt={round.computer} className="history-img" /> {round.computer}
                  </td>
                  <td>{round.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
      <footer>
        &copy; {new Date().getFullYear()} Rock Paper Scissors Game &mdash; Built by Jeevanasree24
      </footer>
    </div>
  );
}

export default App;