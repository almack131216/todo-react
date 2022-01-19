import { useContext } from "react"
import TodoContext from "../../context/TodoContext"

function TodoListFooterBtns() {
  const { clearTodos, deleteCategory, todosComplete, categoryId } =
    useContext(TodoContext)

  return (
    <div className='delete-stuff'>
      {
        <button
          className='btn delete'
          onClick={() => clearTodos(categoryId)}
          disabled={todosComplete > 0 ? false : true}
        >
          Clear {todosComplete} completed{" "}
          {todosComplete === 1 ? "task" : "tasks"}
        </button>
      }

      <button
        className='btn delete'
        onClick={() => deleteCategory(categoryId)}
      >
        Delete list
      </button>
    </div>
  )
}

export default TodoListFooterBtns
