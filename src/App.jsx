import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login and Register/Login'

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>
  },
  {
    path: '/login',
    element: <Login/>
  },
])

export default App
