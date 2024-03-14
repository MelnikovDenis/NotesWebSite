import React from "react";
import cl from "./NotesInput.module.css"

const NotesInput = ({value, setValue, ...props}) => {
      return (
            <input 
                  className={cl.notesInput}
                  value={value} 
                  onChange={e => setValue(e.target.value)} 
                  {...props} />
      );
}

export default NotesInput;