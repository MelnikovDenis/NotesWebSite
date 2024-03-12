import React from "react";
import cl from "./NotesButton.module.css";

const NotesButton = ({children, onClick}) => {
      return (
            <button onClick={onClick} className={cl.notesButton}>
                  {children}
            </button>
      );
}

export default NotesButton;
