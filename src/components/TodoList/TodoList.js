// REF: https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Todo from "./Todo"

export default function TodoList({ todos, cxSetTodos }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return

    console.log(result)
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    cxSetTodos(items)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='todos'>
          {(provided) => (
            <ul
              className='todos'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => {
                return (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Todo todo={todo} />
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
