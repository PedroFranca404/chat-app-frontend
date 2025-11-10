import { Router, RouterProvider } from '@tanstack/react-router'
import './App.css'
import { routeTree } from './routeTree.gen'

const router = new Router({ routeTree: routeTree })


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
