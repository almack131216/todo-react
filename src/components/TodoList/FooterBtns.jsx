import { useContext } from "react"
import TodoContext from "../../context/TodoContext"

function TodoListFooterBtns() {
  const { clearTodos, deleteCategory, todosComplete, categoryId } =
    useContext(TodoContext)

  function handleDeleteCategory(categoryId) {
    deleteCategory(categoryId)
  }

  return (
    <div className='delete-stuff'>
      {
        <button
          className='btn delete'
          onClick={clearTodos}
          disabled={todosComplete > 0 ? false : true}
        >
          Clear {todosComplete} completed{" "}
          {todosComplete === 1 ? "task" : "tasks"}
        </button>
      }

      <button
        className='btn delete'
        onClick={() => handleDeleteCategory(categoryId)}
      >
        Delete list
      </button>
    </div>
  )
}

export default TodoListFooterBtns
