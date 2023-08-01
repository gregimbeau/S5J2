import React from "react";

const NoteList = ({ notes, onSelectNote, onAddNote, currentNoteId }) => {
  return (
    <div className='note-list'>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelectNote(note.id)}
          className={
            currentNoteId === note.id ? "note-item selected" : "note-item"
          }>
          <h2>{note.title}</h2>
          <p>{note.content.slice(0, 15)}</p>
        </div>
      ))}
      <button onClick={onAddNote}>Ajouter une note</button>
    </div>
  );
};

export default NoteList;
