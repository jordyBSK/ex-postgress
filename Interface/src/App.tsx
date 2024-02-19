import './App.css';
import {Outlet} from "react-router-dom";
import SideBarElement from "./components/SideBarElement.tsx";

function App() {

    return (
        <>



            <SideBarElement/>

            <Outlet/>
        </>
    );
}

export default App;
