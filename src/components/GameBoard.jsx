export default function GameBoard({ onSelectSquare, board }) {
    return <ol id="game-board">
        {
            board.map((row, rowIndex) => (
                <li key={rowIndex} className="">
                    <ol>{
                        row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() =>
                                        onSelectSquare(rowIndex, colIndex)
                                    }
                                    disabled={!!col}
                                    className={(col==='X') ? "player-1" : "player-2"}>{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))
        }
    </ol>;
}