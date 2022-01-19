import React, { useContext } from "react"
import TodoList from "./TodoList"
import TodoListHeader from "./Header"
import TodoListForm from "./Form"
import TodoListFooterBtns from "./FooterBtns"
import TodoContext from "../../context/TodoContext"

function TodoListContainer() {
    const { todos, categoryId, categoryName, editCategories, strTodoStatus } = useContext(TodoContext)

    if(!categoryId || categoryId === "") return null

    return (
        <div
          className={`todo-list ${
            editCategories ? "is-editing-categories" : ""
          }`}
        >
          <TodoListHeader categoryName={categoryName} strTodoStatus={strTodoStatus} />
          <div className='todo-body'>
            {/* dynamic population */}
            <div className='tasks'>
              <TodoList
                todos={todos.filter((todo) => todo.categoryId === categoryId)}
              />
            </div>
            {/* /dynamic population */}
            <TodoListForm />
            <TodoListFooterBtns />
          </div>
        </div>
    )
}

export default TodoListContainer
