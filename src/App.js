import React, { useState, useRef, useEffect, useReducer } from "react"
import TodoList from "./TodoList"
import CategoryList from "./CategoryList"
import { v4 as uuidv4 } from "uuid"
import parse from "html-react-parser"
import "./App.css"
import { TodoReducer, ACTIONS } from "./context/TodoReducer"

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_CAT_ID = "todoApp.categoryId"
const LOCAL_STORAGE_KEY_CATS = "todoApp.categories"

function App() {
  const initialState = {
    todos: [],
    categories: [],
    categoryId: "",
    categoryName: "",
    editCategories: false
  }

  const [state, dispatch] = useReducer(TodoReducer, initialState)
  const { todos, categories, categoryId, categoryName, editCategories } = { ...state }

  const setCategoryId = (getCategoryId) => {
    dispatch({
      type: ACTIONS.SET_CATEGORY_ID,
      payload: { categoryId: getCategoryId },
    })
  }

  const setCategoryName = (getCategoryName) => {
    console.log("[setCategoryName]", getCategoryName)

    dispatch({
      type: ACTIONS.SET_CATEGORY_NAME,
      payload: { categoryName: getCategoryName },
    })
  }

  const setCategories = (getCategories) => {
    console.log(getCategories)
    dispatch({
      type: ACTIONS.SET_CATEGORIES,
      payload: { categories: getCategories },
    })
  }

  const setTodos = (getTodos) => {
    console.log(getTodos);
    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: { todos: getTodos },
    })
  }

  const addCategory = (e) => {
    e.preventDefault()
    const name = categoryNameRef.current.value
    if (name === "") return

    dispatch({
      type: ACTIONS.ADD_CATEGORY,
      payload: { name: name },
    })
    categoryNameRef.current.value = null
  }

  const [tasksIncomplete, setTasksIncomplete] = useState(0)
  const [tasksComplete, setTasksComplete] = useState(0)
  const [tasksIncompleteText, setTasksIncompleteText] = useState("")

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

  function toggleEditCategories() {
    dispatch({
      type: ACTIONS.SET_EDIT_CATEGORIES,
      payload: { editCategories: !editCategories },
    })
    console.log("[toggleEditCategories]", editCategories)
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
    }
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

  function AddTodo(e) {
    e.preventDefault()
    const name = todoNameRef.current.value
    if (name === "") return

    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { categoryId: categoryId, name: name, complete: false },
    })
    todoNameRef.current.value = null
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function ClearTodos() {
    console.log("[ClearTodos]", categoryId)
    dispatch({
      type: ACTIONS.CLEAR_TODOS,
      payload: { categoryId: categoryId }
    })
  }

  return (
    <>
      <h1 className='title'>Stuff I need to do</h1>
      <div className='all-tasks'>
        <h2 className='task-list-title'>
          My lists
          <button onClick={toggleEditCategories}>
            {editCategories ? "DONE" : "EDIT"}
          </button>
        </h2>

        {categories.length && (
          <>
            {/* dynamic population */}
            <ul className='task-list'>
              <CategoryList
                categories={categories}
                categoryId={categoryId}
                dispatch={dispatch}
                editCategories={editCategories}
              />
            </ul>
            {/* /dynamic population */}
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='inp-new list'
            placeholder='new list name'
            aria-label='new list name'
            ref={categoryNameRef}
          />
          <button
            type='submit'
            className='btn create'
            aria-label='create new list'
            onClick={addCategory}
          >
            +
          </button>
        </form>
      </div>
      {/* /all-tasks */}

      {categoryId ? (
        <div
          className={`todo-list ${
            editCategories ? "is-editing-categories" : ""
          }`}
        >
          <div className='todo-header'>
            <h2 className='list-title'>?-{categoryName}-?</h2>
            <p className='task-count'>{parse(tasksIncompleteText)}</p>
          </div>
          <div className='todo-body'>
            {/* dynamic population */}
            <div className='tasks'>
              <TodoList
                todos={todos.filter((todo) => todo.categoryId === categoryId)}
                dispatch={dispatch}
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
                  onClick={AddTodo}
                >
                  +
                </button>
              </form>
            </div>
            <div className='delete-stuff'>
              {
                <button
                  className='btn delete'
                  onClick={ClearTodos}
                  disabled={tasksComplete > 0 ? false : true}
                >
                  Clear {tasksComplete} completed{" "}
                  {tasksComplete === 1 ? "task" : "tasks"}
                </button>
              }

              <button
                className='btn delete'
                onClick={() =>
                  dispatch({
                    type: ACTIONS.DELETE_CATEGORY,
                    payload: { categoryId: categoryId },
                  })
                }
              >
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
