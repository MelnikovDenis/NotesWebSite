import React, { useState, useEffect } from "react";
import NotesInput from "../../components/ui/NotesInput/NotesInput.jsx";
import NotesButton from "../../components/ui/NotesButton/NotesButton.jsx";
import NotesModal from "../../components/ui/NotesModal/NotesModal.jsx";
import GroupService from "../../services/GroupService.js";
import useFetching from "../../hooks/useFetching.js";
import cl from "./ChangeGroupModal.module.css";

const ChangeGroupModal = ({groups, setGroups, id, changeModalVisibility, setChangeModalVisibility}) => {
      const [newGroupName, setNewGroupName] = useState("");
      const [errorText, setChangeErrorText] = useState("");

      const [changeFetch, changeError] = useFetching(async () => {
            console.log("changeFetching");
            const response = await GroupService.updateGroup(id, newGroupName);                       
            setGroups([...groups.map(g => { 
                  if(g.id === id) 
                        g.name = newGroupName;
                  return g; })]);
            setNewGroupName("");
            setChangeErrorText("");
            setChangeModalVisibility(false);
      });

      useEffect(() => {
            if(!changeError) {
                  return;
            }
            else {
                  if (changeError.response.data?.error?.name === "ALREADY_EXISTS")
                        setChangeErrorText("Группа с таким именем уже существует");
                  else
                        setChangeErrorText("Что-то пошло не так, попробуйте позднее");
            }            
      }, [changeError]);

      return (
            <NotesModal 
                  visible={changeModalVisibility} 
                  setVisible={(value) => { 
                        if(!value) setNewGroupName(""); 
                        setChangeErrorText("");
                        setChangeModalVisibility(value); 
                  }}>
                        
                  <div className={cl.changeModal}>
                        <div className="errorText">
                              {errorText}
                        </div>

                        <NotesInput setValue={value => { 
                              setNewGroupName(value); 
                              setChangeErrorText(""); 
                        }}
                        value={newGroupName} 
                        placeholder="Новое имя группы"/>   

                        <NotesButton onClick={changeFetch}>
                              Изменить
                        </NotesButton>
                  </div>
            </NotesModal>
      );
}

export default ChangeGroupModal;
