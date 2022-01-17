import ListsContainer from "./components/Lists/Container"
import Container from "./components/TodoList/Container"
import "./App.css"
import { TodoProvider } from "./context/TodoContext"

function App() {
  return (
    <TodoProvider>
      <h1 className='title'>Stuff I need to do</h1>
      <ListsContainer />
      <Container />
    </TodoProvider>
  )
}

export default App
