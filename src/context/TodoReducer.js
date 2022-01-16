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
}

const TodoReducer = (state, action) => {
  console.log("!!! [REDUCER] !!! ", action.type)
  switch (action.type) {
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      }

    case ACTIONS.CLEAR_TODOS:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) =>
            todo.categoryId !== action.payload.categoryId ||
            (todo.categoryId === action.payload.categoryId && !todo.complete)
        ),
      }

    case ACTIONS.SET_EDIT_CATEGORIES:
      return { ...state, editCategories: action.payload.editCategories }

    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload.todos }

    case ACTIONS.ADD_TODO:
      const newTodoId = uuidv4()
      return {
        ...state,
        todos: [...state.todos, addTodo(newTodoId, action.payload)],
      }

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload.categories }

    case ACTIONS.SET_CATEGORY_ID:
      return { ...state, categoryId: action.payload.categoryId }

    case ACTIONS.SET_CATEGORY_NAME:
      return { ...state, categoryName: action.payload.categoryName }

    case ACTIONS.ADD_CATEGORY:
      const newCategoryId = uuidv4()
      return {
        ...state,
        categories: [
          ...state.categories,
          addCategory(newCategoryId, action.payload),
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
        categoryName: action.payload.name,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id
            ? { ...cat, name: action.payload.name }
            : cat
        ),
      }

    case ACTIONS.DELETE_CATEGORY:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.categoryId !== action.payload.categoryId
        ),
        categories: state.categories.filter(
          (category) => category.id !== action.payload.categoryId
        ),
        categoryId: "",
        categoryName: "",
      }

    default:
      return state
  }
}

const MixStates = (state) => {
  return { ...state.categoryId }
}

// function deleteCategory(){
//     const newTodos = todos.filter((todo) => todo.categoryId !== thisCategoryId)
//     setTodos(newTodos)
// }

function addCategory(newCategoryId, { name }) {
  return { id: newCategoryId, name: name }
}

function addTodo(newTodoId, getPayload) {
  return {
    categoryId: getPayload.categoryId,
    id: newTodoId,
    name: getPayload.name,
    complete: false,
  }
}

export { ACTIONS, TodoReducer, MixStates }
