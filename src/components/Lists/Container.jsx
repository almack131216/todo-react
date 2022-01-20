import { useContext } from "react"
import TodoContext from "../../context/TodoContext"
import CategoryList from "./CategoryList"
import Form from "./Form"

function ListsContainer() {

  const {
    categories,
    editCategories,
    cxSetCategories,
    dispatch,
    ACTIONS
  } = useContext(TodoContext)

    //   2do
    const toggleEditCategories = () => {
      dispatch({
        type: ACTIONS.SET_EDIT_CATEGORIES,
        payload: !editCategories,
      })
      console.log("[toggleEditCategories]", editCategories)
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
          {/* <ul className='task-list'> */}
            <CategoryList
              categories={categories}
              cxSetCategories={cxSetCategories}
            />
          {/* </ul> */}
          {/* /dynamic population */}
        </>
      ) : null}

      <Form dispatch={dispatch} ACTIONS={ACTIONS} />
    </div>
  )
}

export default ListsContainer
