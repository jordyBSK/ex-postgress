import './App.css';
import {Outlet} from "react-router-dom";
import SideBarElement from "@/elements/SideBarElement.tsx";



function App() {
    return (
        <div className="flex">

            <div className="w-1/4">
                <SideBarElement/>
            </div>

            <div className="w-3/4">
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
