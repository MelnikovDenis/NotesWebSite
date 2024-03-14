import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching.js";
import cl from "./LeftMenu.module.css";
import GroupService from "../../services/GroupService.js";
import SimpleGroup from "../../components/SimpleGroup/SimpleGroup.jsx";
import NotesButton from "../../components/ui/NotesButton/NotesButton.jsx";
import getDateTime from "../../utils/getDateTime.js";

const LeftMenu = ({children}) => {
      const params = useParams();
      const [groups, setGroups] = useState([]);
      const [fetch, error] = useFetching(async () => {
            const response = await GroupService.readGroups();
            setGroups(response.data)
      });
      useEffect(() => {
            fetch();    
      }, []);
      return (
            <div className={cl.body}>
                  <div className={cl.leftMenu}>                  
                  <div className={cl.leftMenuHeader}>
                        <div className={cl.leftMenuTitle}>Группы заметок</div>
                        <NotesButton>+</NotesButton>
                  </div>
                  
                        {
                              groups.map(group => <SimpleGroup
                                    isActive={params?.id == group.id}
                                    id={group.id}
                                    key={group.id}
                                    name={group.name} 
                                    creationTime={getDateTime(group.creationTime)} 
                                    lastUpdateTime={getDateTime(group.lastUpdateTime)} />)
                        }                  
                  </div>
                  <div>
                        {children}
                  </div>
            </div>
           
      );
}

export default LeftMenu;
