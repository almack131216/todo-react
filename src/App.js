import React, { useState, useRef, useEffect } from "react"
import TodoList from "./TodoList"
import CategoryList from "./CategoryList"
import { v4 as uuidv4 } from "uuid"
import parse from "html-react-parser"
import "./App.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_CAT_ID = "todoApp.categoryId"
const LOCAL_STORAGE_KEY_CATS = "todoApp.categories"

function App() {
  const [todos, setTodos] = useState([])
  const [tasksIncomplete, setTasksIncomplete] = useState(0)
  const [tasksComplete, setTasksComplete] = useState(0)
  const [tasksIncompleteText, setTasksIncompleteText] = useState("")
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [editCategories, setEditCategories] = useState(false)

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
    updateTasksIncomplete()
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
    // updateTasksIncomplete()
  }

  function toggleCategory(category) {
    console.log("[toggleCategory]")
    setCategoryId(category.id)
  }

  function toggleEditCategories() {
    setEditCategories(!editCategories)
    console.log("[toggleEditCategories]", editCategories)
  }

  function categoryNameSave(thisCategoryId, newName){
    console.log('[categoryNameSave]');
    
    const newCategories = [...categories]
    const categoryCurrent = newCategories.find(cat => cat.id === thisCategoryId)
    console.log('[categoryNameSave] current: ', categoryCurrent.name, newName);
    newCategories.find(cat => cat.id === thisCategoryId).name = newName
    console.log('[categoryNameSave] update: ', newCategories)
    setCategories(newCategories)
    if(thisCategoryId === categoryId) setCategoryName(newName)
  }

  function categoryDelete(thisCategoryId) {
    console.log('[categoryDelete]', thisCategoryId);
    // GET->FILTER->SET categories
    const newCategories = categories.filter(
      (category) => category.id !== thisCategoryId
    )
    setCategories(newCategories)
    // GET->FILTER->SET todos
    const newTodos = todos.filter((todo) => todo.categoryId !== thisCategoryId)
    setTodos(newTodos)
    // IF we still have other categories, then select first
    // if (newCategories.length) setCategoryId(newCategories[0].id)
    setCategoryId("")
    setCategoryName("")
  }

  function updateToDoList(categoryId) {
    console.log("[updateToDoList] categoryId: ", categoryId, categories)
    if (!categories.length && !categoryId) return
    const activeCategory = categories.find((cat) => {
      return cat.id === categoryId
    })
    if (activeCategory) {
      console.log("???", activeCategory.name)
      setCategoryName(activeCategory.name)
      // updateTasksIncomplete()
    }
    // const newTodos = todos.filter((todo) => todo.categoryId === categoryId)
    // setTodos(newTodos)
    updateTasksIncomplete()
  }

  function updateTasksIncomplete() {
    const tasksComplete = todos.filter(
      (todo) => todo.complete && todo.categoryId === categoryId
    ).length
    setTasksComplete(tasksComplete)
    const tasksIncomplete = todos.filter(
      (todo) => !todo.complete && todo.categoryId === categoryId
    ).length
    setTasksIncomplete(tasksIncomplete)

    if (tasksIncomplete >= 1 && tasksComplete === 0)
      setTasksIncompleteText(
        `<strong>${tasksIncomplete}</strong> ${
          tasksIncomplete === 1 ? "task" : "tasks"
        }`
      )
    if (tasksIncomplete === 0 && tasksComplete >= 1)
      setTasksIncompleteText(`up to date`)
    if (tasksIncomplete >= 1 && tasksComplete >= 1)
      setTasksIncompleteText(
        `<strong>${tasksComplete} / ${
          tasksIncomplete + tasksComplete
        }</strong> done`
      )
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
    // updateTasksIncomplete()
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
    console.log("[handleClearTodos]", categoryId)
    const newTodos = todos.filter(
      (todo) =>
        todo.categoryId !== categoryId ||
        (todo.categoryId === categoryId && !todo.complete)
    )
    setTodos(newTodos)
  }

  function handleDeleteList() {
    console.log("[handleDeleteList]", categoryId)
    categoryDelete(categoryId)
  }

  return (
    <>
      <h1 className='title'>Stuff I need to do</h1>
      <div className='all-tasks'>
        <h2 className='task-list-title'>
          My lists
          <button onClick={toggleEditCategories}>
            {editCategories ? 'DONE' : 'EDIT'}
          </button>
        </h2>
        {/* dynamic population */}
        <ul className='task-list'>
          <CategoryList
            categories={categories}
            categoryId={categoryId}
            toggleCategory={toggleCategory}
            categoryNameSave={categoryNameSave}
            categoryDelete={categoryDelete}
            editCategories={editCategories}
          />
        </ul>
        {/* /dynamic population */}

        <form>
          <input
            type='text'
            className='inp-new list'
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

      {categoryId ? (
        <div className={`todo-list ${editCategories ? 'is-editing-categories' : ''}`}>
          <div className='todo-header'>
            <h2 className='list-title'>{categoryName}</h2>
            <p className='task-count'>{parse(tasksIncompleteText)}</p>
          </div>
          <div className='todo-body'>
            {/* dynamic population */}
            <div className='tasks'>
              <TodoList
                todos={todos.filter((todo) => todo.categoryId === categoryId)}
                toggleTodo={toggleTodo}
              />
            </div>
            {/* /dynamic population */}
            <div className='new-task-creator'>
              <form>
                <input
                  type='text'
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
              {
                <button
                  className='btn delete'
                  onClick={handleClearTodos}
                  disabled={tasksComplete > 0 ? false : true}
                >
                  Clear {tasksComplete} completed{" "}
                  {tasksComplete === 1 ? "task" : "tasks"}
                </button>
              }

              <button className='btn delete' onClick={handleDeleteList}>
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
