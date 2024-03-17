import React, { useContext, useEffect, useState } from 'react'
import "./addcomponent.css"
import { TodoContext } from '../contextAPI/TodoProvider'

export const AddComponent = () => {
    const [todo, setTodo] = useState("")

    const todoData = useContext(TodoContext);

    const handleclick = () => {
        if(todo === ""){
            alert("Please provide something in input field")
            return
        }
        let id = Date.now()
        todoData.setData([{id: id, todo: todo, completed: false},...todoData.data])
        setTodo("");
    }

    const handleKey = (e) => {
        if(e.keyCode == 13){
            handleclick();
        }
    }
    
    useEffect(()=>{
        const someData = JSON.parse(localStorage.getItem("todos"))
        if(someData && someData.length > 0){
            todoData.setData(someData)
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoData.data))
    },[todoData.data]);

    return (

        <div className="add-component">
            <input type="text" placeholder="Add a new item" value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={handleKey} />
            <button onClick={handleclick}>Add</button>
        </div>

    )
}
