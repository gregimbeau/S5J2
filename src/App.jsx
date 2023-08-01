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
    const newNote = { id: uuidv4(), title: "Untitled", content: "" };
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
        <NoteList notes={notes} onSelectNote={selectNote} onAddNote={addNote} />
      </div>
      <div className='content'>
        <NoteDisplay htmlContent={htmlContent} />
        <MarkdownInput
          saveNote={saveNote}
          content={currentNote.content}
          title={currentNote.title}
        />
      </div>
    </div>
  );
};

export default App;
