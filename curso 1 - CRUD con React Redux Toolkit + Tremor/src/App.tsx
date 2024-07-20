import { Toaster } from 'sonner'
import './App.css'
import ListOfUsers from './components/ListOfUsers'

function App() {

  return (
    <>
      <ListOfUsers/>
      <Toaster richColors/>
    </>
  )
}

export default App
