import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, activeSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function selectSquare(x, y) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[x][y] = activeSymbol;
            return updatedBoard;
        });

        onSelectSquare();
    }

    printBoard(gameBoard);
    function printBoard(b){
        console.log(' ------------------------------ ');
        console.log(JSON.stringify(b[0]));
        console.log(JSON.stringify(b[1]));
        console.log(JSON.stringify(b[2]));
    }

    return <ol id="game-board">
        {
            gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>{
                        row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => selectSquare(rowIndex, colIndex)}>{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))
        }
    </ol>;
}