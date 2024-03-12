import React from "react";
import cl from "./NotesModal.module.css";

const NotesModal = ({children, visible}) => {

      const notesModalClasses = [cl.notesModal];

      if(visible) {
            notesModalClasses.push(cl.active);
      }

      return (
            <div className={notesModalClasses.join(' ')}>
                  <div className={cl.notesModalContent}>
                        {children}
                  </div>
            </div>
      );
}

export default NotesModal;