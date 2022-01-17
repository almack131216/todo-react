import { useRef, useContext } from "react"
import TodoContext from "../../context/TodoContext"

function TodoListForm() {
  const { addTodo } = useContext(TodoContext)
  const todoNameRef = useRef()
  const { categoryId } = useContext(TodoContext)

  function handleAddTodo(e) {
    e.preventDefault()
    const name = todoNameRef.current.value
    if (name === "") return
    const newTodo = {
      name: name,
      categoryId: categoryId,
    }
    addTodo(newTodo)
    todoNameRef.current.value = null
  }

  return (
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
  )
}

export default TodoListForm
