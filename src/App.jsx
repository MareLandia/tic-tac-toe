import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length>0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [ 
        { 
          square: { 
            row:rowIndex, 
            col: colIndex 
          }, 
          player: currentPlayer 
        }, 
        ...prevTurns 
      ];

      console.log('------ ',JSON.stringify(updatedTurns));
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player initialName="Player2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}></GameBoard>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
