import React from "react";
import cl from "./SimpleGroup.module.css";
import { Link } from "react-router-dom";

const SimpleGroup = ({id, name, creationTime, lastUpdateTime, isActive}) => {
      const simpleGroupClasses = [cl.simpleGroup];
      const simpleGroupNameClasses = [cl.simpleGroupName];
      if(isActive) {
            simpleGroupClasses.push(cl.simpleGroupActive);
            simpleGroupNameClasses.push(cl.simpleGroupNameActive);
      }

      return (
            <div className={simpleGroupClasses.join(' ')}>
                  <Link className={cl.simpleGroupLink} to={`/main/${id}`}>
                        <div className={simpleGroupNameClasses.join(' ')}>{name}</div>
                        <div className={cl.times}>
                              <div className={cl.timeValue}>Время создания: {creationTime}</div>
                              <div className={cl.timeValue}>Время обновления: {lastUpdateTime}</div>
                        </div>
                  </Link>                                   
            </div>
      );
}

export default SimpleGroup;
