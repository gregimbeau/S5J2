import React from "react";


const NoteDisplay = ({ title, htmlContent }) => (
  <div className='note-display'>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  </div>
);

export default NoteDisplay;
