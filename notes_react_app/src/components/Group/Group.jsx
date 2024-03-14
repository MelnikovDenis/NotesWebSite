import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching.js";
import NotesService from "../../services/NotesService.js"

const Group = ({name}) => {
      const params = useParams();
      const [notes, setNotes] = useState([]);

      const [fetch, error] = useFetching(async () => {
            const response = await NotesService.readNotes(params.id);
            setNotes(response.data);
      });

      useEffect(() => {
            fetch();
      }, [params]);

      return (
            <div>
                  {params?.id}
            </div>
      );
}

export default Group;
