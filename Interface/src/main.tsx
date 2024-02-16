import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LoginElement from "./components/LoginElement.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DashboardElement from "./components/DashboardElement.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                path:"/",
                element: <LoginElement/>
            },
            {
                path:"/home",
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