import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Header } from './components/Header'
import { addUser } from './redux/userSlice'
import './App.css'
import { Email } from './components/Email'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((data) => dispatch(addUser(data)))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className='App'>
      <Header/>
      <Email/>
    </div>
  )
}

export default App
