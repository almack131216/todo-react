import React, { useRef, useState } from "react"

export default function Category({ category, categoryId, toggleCategory, categoryNameSave, categoryDelete, editCategories }) {
  const [inputText, setInputText] = useState(category.name)
  const [disableBtnSave, setDisableBtnSave] = useState(false)
  const categoryNameRef = useRef()

  function handleCategoryClick() {
    console.log("[handleCategoryClick]")
    toggleCategory(category)
  }

  function canSave(){
    console.log('[canSave]', category.name, ' -> ', inputText);
    setDisableBtnSave(true)
    const name = categoryNameRef.current.value
    if (name === "" || name === category.name) return false
    setDisableBtnSave(false)
    console.log('[canSave] CAN SAVE');
    return true
  }

  function handleCategoryNameSave(e){
    e.preventDefault()
    if (!canSave()) return
    categoryNameSave(category.id, inputText)
  }

  function handleCategoryDelete(e){
    e.preventDefault()
    categoryDelete(category.id)
  }

  const isActiveClass = categoryId === category.id ? " active-list" : null
  return (
    <li className={`list-name ${isActiveClass}`}>
      {
      editCategories ? (
        <span className="input">
          <input type="text" id={category.id} ref={categoryNameRef} value={inputText} onChange={e => setInputText(e.currentTarget.value)}/>
          <button onClick={handleCategoryNameSave} disabled={inputText === "" || inputText === category.name ? true : false}>save</button>
          <button onClick={handleCategoryClick}>show</button>
          <button onClick={handleCategoryDelete}>X</button>
        </span>
      )
      : (
        <span className="text" onClick={handleCategoryClick}>
          {category.name}
        </span>
      )
      }
    </li>
  )
}
