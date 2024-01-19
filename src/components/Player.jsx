import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}) {
    const [ isEditing, setIsEditing] = useState(false);
    const [ name, setName] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !isEditing);
    }

    function handleChange(event) {
        onNameChange(symbol, event.target.value);
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={name} onChange={handleChange}/>
    }

    let symbolClasses = "";
    if (isActive) 
      symbolClasses+= 'active ';
    if(symbol === 'X') {
      symbolClasses += "player-1";
    } else {
      symbolClasses += "player-2";
    }

    return (
        <li className={symbolClasses}>
          <span className="player">
            <span className="player-symbol fredoka-typo">{symbol}</span>
            {playerName}
          </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
        );
}