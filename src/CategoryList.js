import React from "react"
import Category from "./Category"

export default function CategoryList({
  categories,
  categoryId,
  dispatch,
  editCategories
}) {
  return (
    <div>
      {categories.map((cat) => {
        return (
          <Category
            key={cat.id}
            categories={categories}
            category={cat}
            categoryId={categoryId}
            dispatch={dispatch}
            editCategories={editCategories}
          />
        )
      })}
    </div>
  )
}
