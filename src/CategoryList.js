import React from "react"
import Category from "./Category"

export default function CategoryList({ categories, toggleCategory }) {
  return (
    <div>
      {categories.map((cat) => {
        return (
          <Category
            key={cat.id}
            category={cat}
            toggleCategory={toggleCategory}
          />
        )
      })}
    </div>
  )
}
