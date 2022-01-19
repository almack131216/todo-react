import { ACTIONS } from "./TodoReducer"

export const getStatusArr = ({ todos, categoryId }) => {
  let str = ""
  const complete = todos.filter(
    (todo) => todo.complete && todo.categoryId === categoryId
  ).length
  // setTasksComplete(complete)
  const incomplete = todos.filter(
    (todo) => !todo.complete && todo.categoryId === categoryId
  ).length
  // setTasksIncomplete(incomplete)

  if (incomplete >= 1 && complete === 0)
    str = `<strong>${incomplete}</strong> ${
      incomplete === 1 ? "task" : "tasks"
    }`
  if (incomplete === 0 && complete >= 1) str = `up to date`
  if (incomplete >= 1 && complete >= 1)
    str = `<strong>${complete} / ${incomplete + complete}</strong> done`

  return {
    complete,
    incomplete,
    str,
  }
}
