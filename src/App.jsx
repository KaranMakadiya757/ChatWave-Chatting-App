import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login and Register/Login'
import Register from './components/Login and Register/Register'
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import { AuthGuard, LoginAuth } from './components/Authguard/AuthGuard';

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
