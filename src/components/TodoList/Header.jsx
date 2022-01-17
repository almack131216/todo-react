import parse from "html-react-parser"

function TodoListHeader({ categoryName, strTodoStatus }) {
  return (
    <div className='todo-header'>
      <h2 className='list-title'>{categoryName}</h2>
      <p className='task-count'>{parse(strTodoStatus)}</p>
    </div>
  )
}

export default TodoListHeader
