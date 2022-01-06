import React from "react"
import Category from "./Category"

export default function CategoryList({
  categories,
  categoryId,
  toggleCategory,
}) {
  return (
    <div>
      {categories.map((cat) => {
        return (
          <Category
            key={cat.id}
            category={cat}
            categoryId={categoryId}
            toggleCategory={toggleCategory}
          />
        )
      })}
    </div>
  )
}
