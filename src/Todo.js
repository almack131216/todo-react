import React from "react"
import { ACTIONS } from "./context/TodoReducer"

export default function Todo({ todo, dispatch }) {
  function ToggleTodo(id) {
    console.log("[ToggleTodo]")
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: {id}
    })
  }

  return (
    <div className='task'>
      <input
        type='checkbox'
        id={todo.id}
        checked={todo.complete}
        onChange={() => ToggleTodo(todo.id)}
      />
      <label htmlFor={todo.id}>
        <span className='custom-checkbox'></span>
        {todo.name}
      </label>
    </div>
  )
}
