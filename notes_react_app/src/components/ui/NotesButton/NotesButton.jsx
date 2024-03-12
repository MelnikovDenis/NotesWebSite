import React from "react";
import cl from "./NotesButton.module.css";

const NotesButton = ({children, ...props}) => {
      return (
            <button {...props} className={cl.notesButton}>
                  {children}
            </button>
      );
}

export default NotesButton;
