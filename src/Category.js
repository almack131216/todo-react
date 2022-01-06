import React from "react"

export default function Category({ category, toggleCategory }) {
  function handleCategoryClick() {
    console.log("[handleCategoryClick]")
    toggleCategory(category)
  }

  return (
    <li className='list-name' onClick={handleCategoryClick}>
      {category.name}
    </li>
  )
}
