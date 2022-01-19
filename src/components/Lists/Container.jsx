import { useContext } from "react"
import TodoContext from "../../context/TodoContext"
import CategoryList from "./CategoryList"
import Form from "./Form"

function ListsContainer() {

  const {
    categoryId,
    categories,
    editCategories,
    toggleEditCategories,
    addCategory
  } = useContext(TodoContext)

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

      <Form addCategory={addCategory} />
    </div>
  )
}

export default ListsContainer
