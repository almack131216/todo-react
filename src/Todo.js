import {useContext} from "react"
import TodoContext from "./context/TodoContext"

export default function Todo({ todo }) {
  const {dispatch, ACTIONS} = useContext(TodoContext)
  function toggleTodo(id) {
    console.log("[ToggleTodo]")

      dispatch({
        type: ACTIONS.TOGGLE_TODO,
        payload: id
      })
    
  }

  return (
    <div className='task'>
      <input
        type='checkbox'
        id={todo.id}
        checked={todo.complete}
        onChange={() => toggleTodo(todo.id)}
      />
      <label htmlFor={todo.id}>
        <span className='custom-checkbox'></span>
        {todo.name}
      </label>
    </div>
  )
}
