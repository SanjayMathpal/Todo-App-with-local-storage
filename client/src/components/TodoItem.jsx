import React, { useState } from 'react'
import { TodoContext } from "../contextAPI/TodoProvider"
import { useContext } from 'react'
import "./todoitem.css"

export const TodoItem = () => {
    const [isTodoEditable, setIsTodoEditable] = useState(null)
    const [editedTodoText, setEditedTodoText] = useState("");

    const todoData = useContext(TodoContext)

    const handleDelete = (id) => {
        const newData = todoData?.data?.filter((data) => (data.id != id))
        todoData.setData(newData)
    }

    const handleUpdate = (id, updatedTodoText) => {
        if(updatedTodoText === ""){
            alert("Please provide something in input field")
            return
        }
        const updatedData = todoData.data.map(todo => {
            if (todo.id === id) {
                return { ...todo, todo: updatedTodoText };
            }
            return todo;
        });
        todoData.setData(updatedData);
        setIsTodoEditable(null);
    };

    const updateState = (id) => {
        setIsTodoEditable(id);

        todoData.setData((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, isUpdating: true } : prevTodo))
    }

    const updateDone = (id,editedTodoText) => {
        handleUpdate(id, editedTodoText)
        todoData.setData((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, isUpdating: false } : prevTodo))
    }

    const handleToggle = (id) => {
        todoData.setData((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    }

    return (
        <>
            {
                todoData?.data?.map((i) => (
                    <div key={i.id} className={`${i.completed === true ? 'taskCompleted' : 'task'}`}>
                        {
                            i.isUpdating ? <input
                            type="checkbox"
                            disabled={true}
                        /> :
                        <input
                            type="checkbox"
                            checked={i.completed}
                            onChange={() => handleToggle(i.id)}
                        />
                        }
                        {
                            isTodoEditable == i.id ?
                                (<>
                                    <input
                                        className='item2'
                                        type="text"
                                        value={editedTodoText}
                                        onChange={(e) => setEditedTodoText(e.target.value)}
                                    />
                                </>) :
                                <>
                                    {
                                        i.completed ? <strike className='item'>{i.todo}</strike> : <p className='item'>{i.todo}</p>
                                    }
                                </>
                        }
                        {
                            i.completed ? <div className='empty'>
                            </div> :
                                isTodoEditable == i.id ? <p className='symbol' onClick={() => updateDone(i.id,editedTodoText)}>📁</p> :
                                    <p className='symbol' onClick={(e) => updateState(i.id)}>📝</p>
                        }
                        <p className='symbol' onClick={(e) => handleDelete(i.id)}>❌</p>
                    </div>
                ))
            }
        </>
    )
}
