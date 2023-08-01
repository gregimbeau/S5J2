import React, { useState } from "react";

const MarkdownInput = ({
  saveNote,
  content: initialContent,
  title: initialTitle,
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);

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


  return (
    <div className='markdown-input'>
      <input
        type='text'
        value={title}
        onChange={handleTitleChange}
        placeholder='Titre'
        className='note-input' // Ajoutez la classe .note-input ici
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder='Contenu'
        className='note-input' // Ajoutez la classe .note-input ici
      />
      <button className='save' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MarkdownInput;