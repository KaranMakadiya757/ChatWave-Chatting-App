import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login and Register/Login'
import Register from './components/Login and Register/Register'
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';

function App() {
  const Client = new QueryClient()

  return (
    <>
      <QueryClientProvider client={Client}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/home',
    element: <Home />
  },
])

export default App
