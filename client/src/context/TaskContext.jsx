import { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskContextProvider = ({ children }) => {
    const [addFormDisplay, setAddFormDisplay] = useState(false);
    const [editFormDisplay, setEditFormDisplay] = useState(false);
    const [editData, setEditData] = useState({});

    function toggleAddFormDisplay() {
        addFormDisplay ? setAddFormDisplay(false) : setAddFormDisplay(true);
    }

    function toggleEditFormDisplay(data) {
        setEditData(data);
        addFormDisplay ? setEditFormDisplay(false) : setEditFormDisplay(true);
    }

    return (
        <TaskContext.Provider
            value={{
                addFormDisplay,
                editData,
                editFormDisplay,
                toggleAddFormDisplay,
                toggleEditFormDisplay,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
