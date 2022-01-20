import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Category from "./Category"

export default function CategoryList({ categories, cxSetCategories }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return

    console.log(result)
    const items = Array.from(categories)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    cxSetCategories(items)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='cats'>
          {(provided) => (

            <ul {...provided.droppableProps} ref={provided.innerRef} className='task-list'>
              {categories.map((cat, index) => {
                return (
                  <Draggable key={cat.id} draggableId={cat.id} index={index}>
                    {(provided) => (
                      <li className="list-name"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Category category={cat} />
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
