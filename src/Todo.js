import {useContext} from "react"
import TodoContext from "./context/TodoContext"

export default function Todo({ todo }) {
  const {toggleTodo} = useContext(TodoContext)
  function handleToggleTodo(id) {
    console.log("[ToggleTodo]")
    toggleTodo(id)    
  }

  return (
    <div className='task'>
      <input
        type='checkbox'
        id={todo.id}
        checked={todo.complete}
        onChange={() => handleToggleTodo(todo.id)}
      />
      <label htmlFor={todo.id}>
        <span className='custom-checkbox'></span>
        {todo.name}
      </label>
    </div>
  )
}
