import React, { useState, useEffect } from "react";
import MarkdownInput from "@/component/MarkdownInput";
import NoteDisplay from "@/component//NoteDisplay";
import NoteList from "@/component//NoteList";
import Showdown from "showdown";
import { v4 as uuidv4 } from "uuid";

const converter = new Showdown.Converter();

const App = () => {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const deleteNote = () => {
    const updatedNotes = notes.filter((note) => note.id !== currentNote.id);
    setNotes(updatedNotes);

    if (updatedNotes.length > 0) {
      setCurrentNote(updatedNotes[0]);
    } else {
      setCurrentNote({ id: "", title: "", content: "" });
    }
  };

  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    console.log("Setting localStorage", notes); // Add this line
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = { id: uuidv4(), title: "", content: "" };
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
  };

  const selectNote = (id) => {
    const note = notes.find((note) => note.id === id);
    setCurrentNote(note);
  };

  const saveNote = ({ title, content }) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === currentNote.id) {
        return { ...note, title, content };
      }
      return note;
    });
    const updatedCurrentNote = updatedNotes.find(
      (note) => note.id === currentNote.id
    );
    setNotes(updatedNotes);
    setCurrentNote(updatedCurrentNote); // Set the updated current note
  };

  const htmlContent = currentNote
    ? converter.makeHtml(currentNote.content)
    : "";

  return (
    <div className='app'>
      <div className='sidebar'>
        <NoteList
          notes={notes}
          onSelectNote={selectNote}
          onAddNote={addNote}
          currentNoteId={currentNote.id}
        />
      </div>
      <div className='content'>
        <NoteDisplay title={currentNote.title} htmlContent={htmlContent} />
        <MarkdownInput
          saveNote={saveNote}
          deleteNote={deleteNote}
          content={currentNote.content}
          title={currentNote.title}
          noteSelected={currentNote.id !== ""}
        />
      </div>
    </div>
  );
};

export default App;
