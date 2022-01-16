import React from "react"
import Category from "./Category"

export default function CategoryList({
  categories,
  categoryId,
  toggleCategory,
  categoryNameSave,
  editCategories,
  categoryDelete
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
            toggleCategory={toggleCategory}
            categoryNameSave={categoryNameSave}
            categoryDelete={categoryDelete}
            editCategories={editCategories}
          />
        )
      })}
    </div>
  )
}
