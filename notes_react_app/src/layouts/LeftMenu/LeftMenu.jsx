import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching.js";
import cl from "./LeftMenu.module.css";
import GroupService from "../../services/GroupService.js";
import SimpleGroup from "../../components/SimpleGroup/SimpleGroup.jsx";
import NotesButton from "../../components/ui/NotesButton/NotesButton.jsx";
import getDateTime from "../../utils/getDateTime.js";
import AddGroupModal from "../../components/AddGroupModal/AddGroupModal.jsx";
import ChangeGroupModal from "../../components/ChangeGroupModal/ChangeGroupModal.jsx";

const LeftMenu = ({children}) => {
      const [groups, setGroups] = useState([]);
      const [fetch, error] = useFetching(async () => {
            const response = await GroupService.readGroups();
            setGroups(response.data)
      });     
      useEffect(() => {
            fetch();
      }, []);
      const sortedGroups = useMemo(() => {
            return [...groups].sort((a, b) => a["name"].localeCompare(b["name"]));
      }, [groups]);

      const params = useParams();
      const [addModalVisibility, setAddModalVisibility] = useState(false);
      const [changeModalVisibility, setChangeModalVisibility] = useState(false);
      const [curId, setCurId] = useState(-1);
     

      const onChange = (id) => {
            setCurId(id);
            setChangeModalVisibility(true);
      }
      const onDelete = async (id) => {
            await GroupService.deleteGroup(id);
            setGroups(groups.filter(g => g.id !== id));
      }

      return (
            <div className={cl.body}>
                  <AddGroupModal 
                        groups={groups}
                        setGroups={setGroups}
                        addModalVisibility={addModalVisibility} 
                        setAddModalVisibility={setAddModalVisibility}/>
                  <ChangeGroupModal 
                        groups={groups}
                        setGroups={setGroups}
                        changeModalVisibility={changeModalVisibility}
                        setChangeModalVisibility={setChangeModalVisibility}
                        id={curId}
                        />

                  <div className={cl.leftMenu}>                  
                        <div className={cl.leftMenuHeader}>
                              <div className={cl.leftMenuTitle}>Группы заметок</div>
                              <NotesButton onClick={() => setAddModalVisibility(true)}>+</NotesButton>
                        </div>                  
                        {                              
                              sortedGroups.map(group => <SimpleGroup
                                    isActive={params?.id == group.id}
                                    id={group.id}
                                    key={group.id}
                                    name={group.name} 
                                    creationTime={getDateTime(group.creationTime)} 
                                    lastUpdateTime={getDateTime(group.lastUpdateTime)}
                                    onDelete={onDelete}
                                    onChange={onChange} />)
                        }                  
                  </div>
                  <div>
                        {children}
                  </div>
            </div>
           
      );
}

export default LeftMenu;
