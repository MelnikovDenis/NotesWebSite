import React, { useState, useEffect } from "react";
import NotesInput from "../../components/ui/NotesInput/NotesInput.jsx";
import NotesButton from "../../components/ui/NotesButton/NotesButton.jsx";
import NotesModal from "../../components/ui/NotesModal/NotesModal.jsx";
import GroupService from "../../services/GroupService.js";
import useFetching from "../../hooks/useFetching.js";
import cl from "./AddGroupModal.module.css";

const AddGroupModal = ({groups, setGroups, addModalVisibility, setAddModalVisibility}) => {
      const [newGroupName, setNewGroupName] = useState("");
      const [errorText, setAddErrorText] = useState("");

      const [addFetch, addError] = useFetching(async () => {
            const response = await GroupService.createGroup(newGroupName);
            setGroups([...groups, response.data]);
            setNewGroupName("");
            setAddErrorText("");
            setAddModalVisibility(false);
      });

      useEffect(() => {
            if(!addError) {
                  return;
            }
            else {
                  console.log(addError);
                  if (addError.response.data?.error?.name === "ALREADY_EXISTS")
                        setAddErrorText("Группа с таким именем уже существует");
                  else
                        setAddErrorText("Что-то пошло не так, попробуйте позднее");
            }            
      }, [addError]);

      return (
            <NotesModal 
                  visible={addModalVisibility} 
                  setVisible={(value) => { 
                        if(!value) setNewGroupName(""); 
                        setAddErrorText("");
                        setAddModalVisibility(value); 
                  }}>
                        
                  <div className={cl.addModal}>
                        <div className="errorText">
                              {errorText}
                        </div>

                        <NotesInput setValue={value => { 
                              setNewGroupName(value); 
                              setAddErrorText(""); 
                        }}
                        value={newGroupName} 
                        placeholder="Имя группы"/>   

                        <NotesButton onClick={addFetch}>
                              Создать
                        </NotesButton>
                  </div>
            </NotesModal>
      );
}

export default AddGroupModal;
