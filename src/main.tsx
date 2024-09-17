import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserList } from './pages/user-list.tsx'
import { AddUser } from './pages/add-user.tsx'
import { User } from './pages/user.tsx'
import { Layout } from './pages/layout.tsx'

const router = createBrowserRouter([
  { path:"",
    element:<Layout/>,
    children:[
      {path:"",element:<UserList/>},
      {path:"add",element:<AddUser/>},
      {path:"user/:id",element:<User/>}
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
