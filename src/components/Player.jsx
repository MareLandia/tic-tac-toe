import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [ isEditing, setIsEditing] = useState(false);
    const [ name, setName] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !isEditing);
    }

    function handleChange(event) {
        console.log(' ------ ',event);
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange}/>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
          </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
        );
}