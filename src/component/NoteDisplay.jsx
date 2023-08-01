import React from "react";
import Showdown from "showdown";

const converter = new Showdown.Converter();

converter.setFlavor("github"); // Pour activer certains comportements spécifiques de GitHub, comme les URLs automatiques

converter.setOption("simplifiedAutoLink", true); // Pour activer les liens automatiques
converter.setOption("excludeTrailingPunctuationFromURLs", true); // Pour exclure les signes de ponctuation à la fin des URLs
converter.setOption("openLinksInNewWindow", true); // Pour ouvrir les liens dans une nouvelle fenêtre

const NoteDisplay = ({ title, htmlContent }) => {
  const convertedContent = converter.makeHtml(htmlContent);

  return (
    <div className='note-display'>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: convertedContent }} />
    </div>
  );
};

export default NoteDisplay;
