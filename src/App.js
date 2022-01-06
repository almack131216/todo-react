import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import CategoryList from "./CategoryList"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_CAT_ID = "todoApp.categoryId"
const LOCAL_STORAGE_KEY_CATS = "todoApp.categories"

function App() {
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const todoNameRef = useRef()
  const categoryNameRef = useRef()

  useEffect(() => {
    console.log("----------------")
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
      console.log("[useEffect] todos: ", todos)
    }

    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CATS)
    )
    if (storedCategories) {
      setCategories(storedCategories)
      console.log("[useEffect] categories: ", categories)
    }

    const storedCategoryId = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CAT_ID)
    )
    if (storedCategoryId) {
      setCategoryId(storedCategoryId)
      console.log("[useEffect] categoryId: ", categoryId)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log("[useEffect][setItem][todos]", todos)
  }, [todos])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CATS, JSON.stringify(categories))
    console.log("[useEffect][setItem][categories]", categories)
  }, [categories])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CAT_ID, JSON.stringify(categoryId))
    console.log("[useEffect][setItem][categoryId]", categoryId)
    updateToDoList(categoryId)
  }, [categoryId])

  function toggleTodo(id) {
    console.log("[toggleToDo]")
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function toggleCategory(category) {
    console.log("[toggleCategory]")
    setCategoryId(category.id)
  }

  function updateToDoList(categoryId) {
    console.log("[updateToDoList] categoryId: ", categoryId, categories)
    if (!categories.length && !categoryId) return
    const activeCategory = categories.find((cat) => {
      return cat.id === categoryId
    }).name
    if (activeCategory) console.log("???", activeCategory)
    setCategoryName(activeCategory)
    // const newTodos = todos.filter((todo) => todo.categoryId === categoryId)
    // setTodos(newTodos)
  }

  function handleAddTodo(e) {
    e.preventDefault()
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { categoryId: categoryId, id: uuidv4(), name: name, complete: false },
      ]
    })
    todoNameRef.current.value = null
  }

  function handleAddCategory(e) {
    e.preventDefault()
    const name = categoryNameRef.current.value
    if (name === "") return
    const newCategoryId = uuidv4()
    setCategories((prevCategories) => {
      return [...prevCategories, { id: newCategoryId, name: name }]
    })
    setCategoryId(newCategoryId)
    categoryNameRef.current.value = null
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
        <ul className='task-list' data-lists>
          <CategoryList
            categories={categories}
            toggleCategory={toggleCategory}
          />
        </ul>
        {/* /dynamic population */}

        <form data-new-list-form>
          <input
            type='text'
            className='inp-new list'
            data-new-list-input
            placeholder='new list name'
            aria-label='new list name'
            ref={categoryNameRef}
          />
          <button
            className='btn create'
            aria-label='create new list'
            onClick={handleAddCategory}
          >
            +
          </button>
        </form>
      </div>
      {/* /all-tasks */}

      {(todos && todos.length) || categoryId ? (
        <div className='todo-list' data-list-display-container>
          <div className='todo-header'>
            <h2 className='list-title' data-list-title>
              My Tasks | {categoryName}
            </h2>
            <p className='task-count' data-list-count>
              {
                todos.filter(
                  (todo) => !todo.complete && todo.categoryId === categoryId
                ).length
              }{" "}
              left to do
            </p>
          </div>
          <div className='todo-body'>
            {/* dynamic population */}
            <div className='tasks' data-tasks>
              <TodoList
                todos={todos.filter((todo) => todo.categoryId === categoryId)}
                toggleTodo={toggleTodo}
              />
            </div>
            {/* /dynamic population */}
            <div className='new-task-creator'>
              <form data-new-task-form>
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
      ) : null}
    </>
  )
}

export default App
