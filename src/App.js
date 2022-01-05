import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
    console.log("[useEffect][1]", todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log("[useEffect][2]", todos)
  }, [todos])

  function toggleTodo(id) {
    console.log("[toggleToDo]")
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h1 className='title'>Stuff I need to do</h1>
      <div className='all-tasks'>
        <h2 className='task-list-title'>My lists</h2>
        {/* dynamic population */}
        <ul className='task-list' data-lists></ul>
        {/* /dynamic population */}

        <form action='' data-new-list-form>
          <input
            type='text'
            className='inp-new list'
            data-new-list-input
            placeholder='new list name'
            aria-label='new list name'
          />
          <button className='btn create' aria-label='create new list'>
            +
          </button>
        </form>
      </div>
      {/* /all-tasks */}

      <div className='todo-list' data-list-display-container>
        <div className='todo-header'>
          <h2 className='list-title' data-list-title>
            My Tasks
          </h2>
          <p className='task-count' data-list-count>
            {todos.filter((todo) => !todo.complete).length} left to do
          </p>
        </div>
        <div className='todo-body'>
          {/* dynamic population */}
          <div className='tasks' data-tasks>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </div>
          {/* /dynamic population */}
          <div className='new-task-creator'>
            <form action='' data-new-task-form>
              <input
                type='text'
                data-new-task-input
                className='inp-new task'
                placeholder='new task name'
                aria-label='new task name'
                ref={todoNameRef}
              />
              <button
                className='btn create'
                aria-label='create new task'
                onClick={handleAddTodo}
              >
                +
              </button>
            </form>
          </div>
          <div className='delete-stuff'>
            <button
              className='btn delete'
              data-clear-complete-tasks-button
              onClick={handleClearTodos}
            >
              Clear completed tasks
            </button>
            <button className='btn delete' data-delete-list-button>
              Delete list
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
