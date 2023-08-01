import React from "react";

const NoteDisplay = ({ htmlContent }) => (
  <div
    className='note-display'
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
);

export default NoteDisplay;
