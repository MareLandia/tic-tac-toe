import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length>0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers]= useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => { 
      return{ 
        ...prevPlayers,
        [symbol]: newName 
      }
    });
  }

  // printBoard(gameBoard);
  // function printBoard(b){
  //     console.log(' ------------------------------ ');
  //     console.log(JSON.stringify(b[0]));
  //     console.log(JSON.stringify(b[1]));
  //     console.log(JSON.stringify(b[2]));
  // }
  let winner;

  for (const comb of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comb[0].row][comb[0].col];
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].col];
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].col];
    if (!!firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}></Player>
          <Player initialName="Player2" symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={players[winner]} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}></GameBoard>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
