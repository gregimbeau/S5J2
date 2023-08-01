import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const MarkdownInput = ({
  saveNote,
  deleteNote,
  content: initialContent,
  title: initialTitle,
  noteSelected,
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const TextareaAutosizeRef = useRef();

  useEffect(() => {
    setContent(initialContent);
    setTitle(initialTitle);
  }, [initialContent, initialTitle]);

  if (!noteSelected) {
    return null; // Si aucune note n'est sélectionnée, le composant ne rend rien
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    console.log("Saving", { title, content }); // Add this line
    saveNote({ title, content });
  };

  const handleDelete = () => {
    console.log("Deleting", { title, content });
    deleteNote(); // Appel de la fonction deleteNote quand le bouton est cliqué
  };

  const insertTag = (tag) => {
    const startTag = tag;
    const endTag = tag.split("").reverse().join(""); // Inverse du tag pour la fermeture (marche pour ** et *)
    const { selectionStart, selectionEnd } = TextareaAutosizeRef.current;
    const textBefore = content.substring(0, selectionStart);
    const textAfter = content.substring(selectionEnd);
    const textSelection = content.substring(selectionStart, selectionEnd);
    setContent(textBefore + startTag + textSelection + endTag + textAfter);
  };
  const handleClick = (e) => {
   
    if (e.button === 0) {
       console.log(e);
    }
}
  return (
    <div className='markdown-input'>
      <input
        type='text'
        value={title}
        onChange={handleTitleChange}
        placeholder='Titre'
        className='note-input' // Ajoutez la classe .note-input ici
      />
      <div className='button-group'>
        <button onClick={() => insertTag("**")}>Bold</button>
        <button onClick={() => insertTag("*")}>Italic</button>
        <button onClick={() => insertTag("[Link](url)")}>Link</button>
      </div>
      <TextareaAutosize
        ref={TextareaAutosizeRef}
        value={content}
        onChange={handleContentChange}
        placeholder='Contenu'
        className='note-input textarea' // Ajoutez la classe .note-input ici
        onClick={handleClick}
      />
      <button className='save' onClick={handleSave}>
        Save
      </button>
      <button className='delete' onClick={handleDelete}>
        Effacer la note
      </button>{" "}
    </div>
  );
};

export default MarkdownInput;
