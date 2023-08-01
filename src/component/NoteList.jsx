import React from "react";

const NoteList = ({ notes, onSelectNote, onAddNote }) => (
  <div className='note-list'>
    {notes.map((note) => (
      <div key={note.id} onClick={() => onSelectNote(note.id)}>
        <h2>{note.title}</h2>
        <p>{note.content.slice(0, 15)}</p>
      </div>
    ))}
    <button onClick={onAddNote}>Ajouter une note</button>
  </div>
);

export default NoteList;

