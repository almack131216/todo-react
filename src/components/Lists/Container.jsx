import { useContext, useRef } from "react"
import TodoContext from "../../context/TodoContext"
import CategoryList from "../../CategoryList"

function ListsContainer() {
  const categoryNameRef = useRef()

  const {
    categoryId,
    categories,
    editCategories,
    toggleEditCategories,
    addCategory
  } = useContext(TodoContext)

  function handleSubmit(e) {
    e.preventDefault()
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    const name = categoryNameRef.current.value
    if (name === "") return
    addCategory(name)
    categoryNameRef.current.value = null
  }

  return (
    <div className='all-tasks'>
      <h2 className='task-list-title'>
        My lists
        <button onClick={toggleEditCategories}>
          {editCategories ? "DONE" : "EDIT"}
        </button>
      </h2>

      {categories.length ? (
        <>
          {/* dynamic population */}
          <ul className='task-list'>
            <CategoryList
              categories={categories}
              categoryId={categoryId}
              editCategories={editCategories}
            />
          </ul>
          {/* /dynamic population */}
        </>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='inp-new list'
          placeholder='new list name'
          aria-label='new list name'
          ref={categoryNameRef}
        />
        <button
          type='submit'
          className='btn create'
          aria-label='create new list'
          onClick={handleAddCategory}
        >
          +
        </button>
      </form>
    </div>
  )
}

export default ListsContainer
