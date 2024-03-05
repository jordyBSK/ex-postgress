import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardElement from "./elements/DashboardElement.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                path:"/",
             element: <DashboardElement/>
            }
        ]
    },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)