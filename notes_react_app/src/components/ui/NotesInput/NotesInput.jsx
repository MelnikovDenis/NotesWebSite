import React from "react";
import cl from "./NotesInput.module.css"

const NotesInput = (props) => {
      return (
            <input {...props} className={cl.notesInput}/>
      );
}

export default NotesInput;