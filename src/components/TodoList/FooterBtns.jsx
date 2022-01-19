import { useContext } from "react"
import TodoContext from "../../context/TodoContext"

function TodoListFooterBtns() {
  const { todosComplete, categoryId, dispatch, ACTIONS, cxDeleteCategory } =
    useContext(TodoContext)

  const clearTodos = (getCategoryId) => {
    console.log("[clearTodos]", getCategoryId)
    dispatch({
      type: ACTIONS.CLEAR_TODOS,
      payload: getCategoryId,
    })
  }

  const deleteCategory = (id) => {
    cxDeleteCategory(id)
  }

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

      <button className='btn delete' onClick={() => deleteCategory(categoryId)}>
        Delete list
      </button>
    </div>
  )
}

export default TodoListFooterBtns
