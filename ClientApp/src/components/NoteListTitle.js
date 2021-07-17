import React from 'react'

const NoteListTitle = ({ title, stateValues, handlers }) => {
    return (
        <div>
            {(stateValues.editing) 
                ? <input type="text" value={stateValues.newTitle} onChange={handlers.titleChange} onKeyUp={handlers.editList}></input>
                : <h2 className="note-list-title">{title}</h2>
            }
        </div>
    )
}

export default NoteListTitle