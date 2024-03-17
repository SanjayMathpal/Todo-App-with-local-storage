import { useState } from 'react'
import './App.css'
import { AddComponent } from './components/AddComponent'
import { TodoItem } from './components/TodoItem'

function App() {
  return (
    <>
      <h1>My Todo List</h1>
      <AddComponent/>
      <TodoItem/>
    </>
  )
}

export default App
