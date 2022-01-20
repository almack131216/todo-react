import { v4 as uuidv4 } from "uuid"

const ACTIONS = {
  ADD_TODO: "add-todo",
  SET_TODOS: "set-todos",
  DELETE_TODOS: "delete-todos",
  SELECT_CATEGORY: "select-category",
  ADD_CATEGORY: "add-category",
  DELETE_CATEGORY: "delete-category",
  SET_CATEGORIES: "set-categories",
  SET_CATEGORY_ID: "set-category-id",
  SET_CATEGORY_NAME: "set-category-name",
  SET_EDIT_CATEGORIES: "set-edit-categories",
  CLEAR_TODOS: "clear-todos",
  TOGGLE_TODO: "toggle-todo",
  UPDATE_STR_STATUS: "update-str-status",
}

const todoReducer = (state, action) => {
  console.log("!!! [REDUCER] !!! ", action.type)
  switch (action.type) {
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      }

    case ACTIONS.CLEAR_TODOS:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) =>
            todo.categoryId !== action.payload ||
            (todo.categoryId === action.payload && !todo.complete)
        ),
        todosComplete: 0,
        todosIncomplete: 0,
      }

    case ACTIONS.SET_EDIT_CATEGORIES:
      return { ...state, editCategories: action.payload }

    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload }

    case ACTIONS.ADD_TODO:
      const newTodoId = uuidv4()
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            categoryId: action.payload.categoryId,
            id: newTodoId,
            name: action.payload.name,
            complete: false,
          },
        ],
      }

    case ACTIONS.UPDATE_STR_STATUS:
      return {
        ...state,
        todosComplete: action.payload.complete,
        todosIncomplete: action.payload.incomplete,
        strTodoStatus: action.payload.str,
      }

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case ACTIONS.SET_CATEGORY_ID:
      return { ...state, categoryId: action.payload }

    case ACTIONS.SET_CATEGORY_NAME:
      return {
        ...state,
        categoryId: action.payload.id,
        categoryName: action.payload.name,
      }

    case ACTIONS.ADD_CATEGORY:
      const newCategoryId = uuidv4()
      return {
        ...state,
        categories: [
          ...state.categories,
          { id: newCategoryId, name: action.payload },
        ],
        categoryId: newCategoryId,
        categoryName: action.payload.name,
      }

    case ACTIONS.SELECT_CATEGORY:
      return {
        ...state,
        categoryId: action.payload.categoryId,
        categoryName: action.payload.categoryName,
      }

    case ACTIONS.SAVE_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.payload.id === state.categoryId ? action.payload.name : state.categoryName,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id
            ? { ...cat, name: action.payload.name }
            : cat
        ),
      }

    case ACTIONS.DELETE_CATEGORY:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.categoryId !== action.payload),
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        categoryId: "",
        categoryName: "",
      }

    default:
      return state
  }
}

export { ACTIONS, todoReducer }
