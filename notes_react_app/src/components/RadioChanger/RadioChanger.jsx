import React from "react";
import changerCl from "./RadioChanger.module.css";
import radioCl from "./NotesRadio.module.css";

const NotesRadio = ({children, value, name, checked, onChange}) => {
      const notesRadioClasses = [radioCl.notesRadioText];
      if(checked) {
            notesRadioClasses.push(radioCl.active);
      }

      return (
            <label className={notesRadioClasses.join(' ')}>
                  <input type="radio" 
                        className={radioCl.notesRadioButton} 
                        value={value} 
                        name={name}
                        checked={checked}
                        onChange={onChange} />
                  {children}
            </label>
      );    
}

const RadioChanger = ({options, name, curValue, onChange}) => {
      return (
            <div className={changerCl.radioChanger} >
                  {options.map(option =>                        
                        <NotesRadio 
                              key={option.value}
                              name={name} 
                              value={option.value}
                              onChange={onChange}
                              checked={curValue === option.value}>
                                    {option.text}                              
                        </NotesRadio>
                  )}
            </div>
      );
}

export default RadioChanger;