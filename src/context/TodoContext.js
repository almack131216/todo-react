import { createContext, useEffect, useReducer } from "react"
import { ACTIONS, todoReducer } from "./TodoReducer"

const TodoContext = createContext()

const LOCAL_STORAGE_KEY = "todoApp.todos"
const LOCAL_STORAGE_KEY_CAT_ID = "todoApp.categoryId"
const LOCAL_STORAGE_KEY_CATS = "todoApp.categories"

export const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    categories: [],
    categoryId: "",
    categoryName: "",
    editCategories: false,
    todosIncomplete: 0,
    todosComplete: 0,
    strTodoStatus: "",
  }

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const {
    todos,
    categories,
    categoryId,
    todosIncomplete,
    todosComplete,
    strTodoStatus,
  } = { ...state }

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
    updateTodosIncomplete()
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

  //   2do
  //   function toggleEditCategories() {
  //     dispatch({
  //       type: ACTIONS.SET_EDIT_CATEGORIES,
  //       payload: { editCategories: !editCategories },
  //     })
  //     console.log("[toggleEditCategories]", editCategories)
  //   }

  const setCategoryId = (getCategoryId) => {
    dispatch({
      type: ACTIONS.SET_CATEGORY_ID,
      payload: { categoryId: getCategoryId },
    })
  }

  const setCategoryName = (getCategoryArr) => {
    console.log("[setCategoryName]", getCategoryArr)

    dispatch({
      type: ACTIONS.SET_CATEGORY_NAME,
      payload: getCategoryArr,
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
    console.log(getTodos)
    dispatch({
      type: ACTIONS.SET_TODOS,
      payload: { todos: getTodos },
    })
  }

  //   const setTasksComplete = (getTasks) => {
  //     console.log(getTasks);
  //     dispatch({
  //       type: ACTIONS.SET_TASKS_COMPLETE,
  //       payload: getTasks,
  //     })
  //   }

  //   const setTasksIncomplete = (getTasks) => {
  //     console.log(getTasks);
  //     dispatch({
  //       type: ACTIONS.SET_TASKS_INCOMPLETE,
  //       payload: getTasks,
  //     })
  //   }

  function updateToDoList(categoryId) {
    console.log("[updateToDoList] categoryId: ", categoryId, categories)
    if (!categories.length && !categoryId) return
    const activeCategory = categories.find((cat) => {
      return cat.id === categoryId
    })
    if (activeCategory) {
      console.log("???", activeCategory)
      setCategoryName(activeCategory)
    }
    updateTodosIncomplete()
  }

  function deleteCategory(id) {
    dispatch({
      type: ACTIONS.DELETE_CATEGORY,
      payload: id,
    })
    // const newTodos = todos.filter((todo) => todo.categoryId !== thisCategoryId)
    // setTodos(newTodos)
  }

  function updateTodosIncomplete() {
    let str = ""
    const todosComplete = todos.filter(
      (todo) => todo.complete && todo.categoryId === categoryId
    ).length
    // setTasksComplete(todosComplete)
    const todosIncomplete = todos.filter(
      (todo) => !todo.complete && todo.categoryId === categoryId
    ).length
    // setTasksIncomplete(todosIncomplete)

    if (todosIncomplete >= 1 && todosComplete === 0)
      str = `<strong>${todosIncomplete}</strong> ${
        todosIncomplete === 1 ? "task" : "tasks"
      }`
    if (todosIncomplete === 0 && todosComplete >= 1) str = `up to date`
    if (todosIncomplete >= 1 && todosComplete >= 1)
      str = `<strong>${todosComplete} / ${
        todosIncomplete + todosComplete
      }</strong> done`

    dispatch({
      type: ACTIONS.UPDATE_STR_STATUS,
      payload: {
        complete: todosComplete,
        incomplete: todosIncomplete,
        str,
      },
    })
  }

  const addTodo = (newTodo) => {
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: {
        categoryId: newTodo.categoryId,
        name: newTodo.name,
        complete: false,
      },
    })
  }

  function clearTodos(getCategoryId) {
    console.log("[clearTodos]", getCategoryId)
    dispatch({
      type: ACTIONS.CLEAR_TODOS,
      payload: { categoryId: getCategoryId },
    })
  }

  const addCategory = (getName) => {
    dispatch({
      type: ACTIONS.ADD_CATEGORY,
      payload: { name: getName },
    })
  }

  const setCategory = (getCategory) => {
    dispatch({
      type: ACTIONS.SELECT_CATEGORY,
      payload: { categoryId: getCategory.id, categoryName: getCategory.name },
    })
  }

  const toggleTodo = (getId) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: { id: getId },
    })
  }

  return (
    <TodoContext.Provider
      value={{
        ...state,
        setCategories,
        setTodos,
        addTodo,
        toggleTodo,
        clearTodos,
        dispatch,
        addCategory,
        setCategory,
        deleteCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
