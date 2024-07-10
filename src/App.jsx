// REACT-ROUTER-DOM
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// COMPONENTS IMPORT
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login and Register/Login'
import Register from './components/Login and Register/Register'
import Home from './components/Home/Home'
import { AuthGuard, LoginAuth } from './components/Authguard/AuthGuard'

// REACT-TOASIFY
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// REACT REDUX
import { useSelector } from 'react-redux'

// CSS
import './App.css'
import { useEffect } from 'react'


function App() {
  const theme = useSelector(state => state.Theme.theme)

  useEffect(() => {
    document.body.classList.add(theme)
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginAuth><Welcome /></LoginAuth>
  },
  {
    path: '/login',
    element: <LoginAuth><Login /></LoginAuth>
  },
  {
    path: '/register',
    element: <LoginAuth><Register /></LoginAuth>
  },
  {
    path: '/home',
    element: <AuthGuard><Home /></AuthGuard>
  },
  {
    path: '/home/:id',
    element: <AuthGuard><Home /></AuthGuard>
  }
])

export default App
