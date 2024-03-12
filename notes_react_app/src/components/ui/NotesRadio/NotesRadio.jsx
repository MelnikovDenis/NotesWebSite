import React from "react";
import cl from "./NotesRadio.module.css";

const NotesRadio = ({children, value, name, checked, onChange}) => {
      const notesRadioClasses = [cl.notesRadioText];
      if(checked) {
            notesRadioClasses.push(cl.active);
      }

      return (
            <label className={notesRadioClasses.join(' ')}>
                  <input type="radio" 
                        className={cl.notesRadioButton} 
                        value={value} 
                        name={name}
                        checked={checked}
                        onChange={onChange} />
                  {children}
            </label>
      );    
}

export default NotesRadio;
