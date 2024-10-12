import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './pages/Home'
import PostService from './pages/PostService'
import { Toaster } from './components/ui/sonner'

const router=createBrowserRouter([{
  path:'/',
  element:<Home/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/register',
  element:<Register/>
},{
  path:'/postService',
  element:<PostService/>
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster/>
    <RouterProvider router={router}/>
    </Provider>
   
  </StrictMode>,
)
