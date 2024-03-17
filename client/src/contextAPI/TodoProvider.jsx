import { createContext, useState } from "react";

export const TodoContext = createContext({});

export const TodoProvider = ({children}) => {
    const [data, setData] = useState([]);
    return (
        <TodoContext.Provider value={{data,setData}}>
            {children}
        </TodoContext.Provider>
    )
}