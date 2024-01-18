import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
    let gameBoard = initialGameBoard;
    for (const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
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
                                <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={!!col}>{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))
        }
    </ol>;
}