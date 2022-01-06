import React from "react"

export default function Category({ category, categoryId, toggleCategory }) {
  function handleCategoryClick() {
    console.log("[handleCategoryClick]")
    toggleCategory(category)
  }

  const isActiveClass = categoryId === category.id ? " active-list" : null
  return (
    <li className={`list-name ${isActiveClass}`} onClick={handleCategoryClick}>
      {category.name}
    </li>
  )
}
