import React from "react";
import cl from "./NotesInput.module.css"

const NotesInput = ({value, onChange, ...props}) => {
      return (
            <input 
                  className={cl.notesInput}
                  value={value} 
                  onChange={onChange} 
                  {...props} />
      );
}

export default NotesInput;