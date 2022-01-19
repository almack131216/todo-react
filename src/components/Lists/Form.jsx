import { useRef } from "react"

function Form({addCategory}) {
  const categoryNameRef = useRef()

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
  )
}

export default Form
