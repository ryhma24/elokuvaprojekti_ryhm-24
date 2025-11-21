import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TitleItems from "./screens/TitleItems.jsx";
import NotFound from "./screens/NotFound.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/:type/title/:id", element:<TitleItems/>},
  {path:"*", element:<NotFound/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
