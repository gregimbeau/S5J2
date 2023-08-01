import React, { useState, useEffect } from "react";
import MarkdownInput from "@/component/MarkdownInput";
import NoteDisplay from "@/component//NoteDisplay";
import NoteList from "@/component//NoteList";
import { v4 as uuidv4 } from "uuid";

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
    if (currentNote.id === id) {
      setCurrentNote({ id: "", title: "", content: "" });
    } else {
      const note = notes.find((note) => note.id === id);
      setCurrentNote(note);
    }
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

  const htmlContent = currentNote.content;

  const exportNotes = () => {
    // Créer le contenu du fichier
    let fileContent = "";
    for (const note of notes) {
      fileContent += `Titre: ${note.title}\n\n${note.content}\n\n---------------\n\n`;
    }

    // Créer un Blob avec le contenu du fichier
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });

    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes_export.txt";

    // Simuler un clic sur le lien pour déclencher le téléchargement
    link.click();

    // Supprimer le lien quand le téléchargement est terminé
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <button className='export-button' onClick={exportNotes}>
          Exporter les notes
        </button>
        <NoteList
          notes={notes}
          onSelectNote={selectNote}
          onAddNote={addNote}
          currentNoteId={currentNote.id}
        />
      </div>
      <div className='content'>
        {currentNote.id !== "" ? (
          <>
            <NoteDisplay title={currentNote.title} htmlContent={htmlContent} />
            <MarkdownInput
              saveNote={saveNote}
              deleteNote={deleteNote}
              content={currentNote.content}
              title={currentNote.title}
              noteSelected={currentNote.id !== ""}
            />
          </>
        ) : (
          <div className='note-message'>
            <p>Votre Bloc-Note</p>
            <p>
              <img
                src='https://i.ibb.co/n1MfzJ6/notepadred.png'
                alt='Notepad'
              />
            </p>
            <p>Sélectionnez une note pour l'afficher ici.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
