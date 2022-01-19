import { useRef } from "react"

function Form({dispatch, ACTIONS}) {
  const categoryNameRef = useRef()

  function formSubmit(e) {
    e.preventDefault()
  }

  const addCategory = (e) => {
    e.preventDefault()
    const name = categoryNameRef.current.value
    if (name === "") return
    dispatch({
      type: ACTIONS.ADD_CATEGORY,
      payload: name
    })
    categoryNameRef.current.value = null
  }

  return (
    <form onSubmit={formSubmit}>
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
        onClick={addCategory}
      >
        +
      </button>
    </form>
  )
}

export default Form
