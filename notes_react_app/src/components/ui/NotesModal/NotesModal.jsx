import React from "react";
import cl from "./NotesModal.module.css";

const NotesModal = ({children, visible, setVisible}) => {

      const notesModalClasses = [cl.notesModal];

      if(visible) {
            notesModalClasses.push(cl.active);
      }

      return (
            <div className={notesModalClasses.join(' ')} onClick={() => setVisible(false)}>
                  <div className={cl.notesModalContent} onClick={(e) => e.stopPropagation()}>
                        {children}
                  </div>
            </div>
      );
}

export default NotesModal;