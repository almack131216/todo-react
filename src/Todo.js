import React from "react"

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    console.log("[handleTodoClick]")
    toggleTodo(todo.id)
  }

  return (
    <div className='task'>
      <input
        type='checkbox'
        id={todo.id}
        checked={todo.complete}
        onChange={handleTodoClick}
      />
      <label htmlFor={todo.id}>
        <span className='custom-checkbox'></span>
        {todo.name}
      </label>
    </div>
  )
}
