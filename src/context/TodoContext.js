import { createContext, useEffect, useReducer } from "react"
import { ACTIONS, todoReducer } from "./TodoReducer"
import { getStatusArr } from "./TodoActions"

const TodoContext = createContext()

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_CAT_ID = "todoApp.categoryId"
const LOCAL_STORAGE_KEY_CATS = "todoApp.categories"

export const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    categories: [],
    categoryId: "",
    editCategories: false,
  }

  const [state, dispatch] = useReducer(todoReducer, initialState)
  const { todos, categories, categoryId } = { ...state }

  // useEffect hooks
  useEffect(() => {
    console.log("----------------")
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      cxSetTodos(storedTodos)
      console.log("[CX]---[useEffect] todos: ", todos)
    }

    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CATS)
    )
    if (storedCategories) {
      cxSetCategories(storedCategories)
      console.log("[CX]---[useEffect] categories: ", categories)
    }

    const storedCategoryId = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_CAT_ID)
    )
    if (storedCategoryId) {
      setCategoryId(storedCategoryId)
      console.log("[CX]---[useEffect] categoryId: ", categoryId)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log("[CX]---[useEffect][setItem][todos]", todos)
    updateTodosStatus()
  }, [todos])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CATS, JSON.stringify(categories))
    console.log("[CX]---[useEffect][setItem][categories]", categories)
  }, [categories])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CAT_ID, JSON.stringify(categoryId))
    console.log("[CX]---[useEffect][setItem][categoryId]", categoryId)
    updateToDoList(categoryId)
  }, [categoryId])
  // /useEffect hooks

  const cxDeleteCategory = (id) => {
    if (window.confirm(`Are you sure you want to delete category?`)) {
      dispatch({
        type: ACTIONS.DELETE_CATEGORY,
        payload: id,
      })
    }
  }

  const setCategoryId = (getCategoryId) => {
    dispatch({
      type: ACTIONS.SET_CATEGORY_ID,
      payload: getCategoryId,
    })
  }

  const setCategoryName = (getCategoryArr) => {
    console.log("[CX]---[setCategoryName]", getCategoryArr)

    dispatch({
      type: ACTIONS.SET_CATEGORY_NAME,
      payload: getCategoryArr,
    })
  }
  
  const cxSetTodos = (getTodos) => {
    console.log("[CX]---[cxSetTodos]", getTodos)
    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: getTodos,
    })
  }

  const cxSetCategories = (getCategories) => {
    console.log("[CX]---[cxSetCategories]", getCategories)
    console.log(getCategories)
    dispatch({
      type: ACTIONS.SET_CATEGORIES,
      payload: getCategories,
    })
  }


  function updateToDoList(categoryId) {
    console.log("[CX]---[updateToDoList] categoryId: ", categoryId, categories)
    if (!categories.length && !categoryId) return
    const activeCategory = categories.find((cat) => {
      return cat.id === categoryId
    })
    if (activeCategory) setCategoryName(activeCategory)
    updateTodosStatus()
  }

  function updateTodosStatus() {
    console.log("[CX]---[updateTodosStatus]")
    const statusArr = getStatusArr({ todos, categoryId })

    dispatch({
      type: ACTIONS.UPDATE_STR_STATUS,
      payload: {
        complete: statusArr.complete,
        incomplete: statusArr.incomplete,
        str: statusArr.str,
      },
    })
  }

  return (
    <TodoContext.Provider
      value={{
        ...state,
        dispatch,
        ACTIONS,
        cxSetTodos,
        cxSetCategories,
        cxDeleteCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
