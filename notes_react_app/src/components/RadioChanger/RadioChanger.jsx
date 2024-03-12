import React from "react";
import cl from "./RadioChanger.module.css";
import NotesRadio from "../ui/NotesRadio/NotesRadio.jsx";

const RadioChanger = ({options, name, curValue, onChange}) => {
      return (
            <div className={cl.radioChanger} >
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