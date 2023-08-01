import React from "react";

const NoteDisplay = ({ title, htmlContent }) => {
  if (!title && !htmlContent) {
    return (
      <div className='note-display'>
        <h2>Votre Bloc-Note</h2>
        <p>Sélectionnez une note pour l'afficher ici.</p>
      </div>
    );
  }

  return (
    <div className='note-display'>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default NoteDisplay;
