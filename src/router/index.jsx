import {
    createBrowserRouter,

} from "react-router-dom";

import DashboardPage from '../pages/DashboardPage.jsx';
import StockPage from '../pages/StockPage.jsx';
import LoginPage from "../pages/LoginPage.jsx";
import Navbar from "../pages/Navbar.jsx";
import CreateMaterialPage from "../pages/CreateMaterialPage.jsx";
import WarehousePage from "../pages/WarehousePage.jsx";
import AreaPage from "../pages/AreaPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar/>,
        children: [
            {
                path: "/",
                element: <DashboardPage/>
            },
            {
                path: "/stock",
                element: <StockPage/>
            },
            {
                path: "/warehouse",
                element: <WarehousePage/>
            },
            {
                path: "/create",
                element: <CreateMaterialPage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/area",
                element: <AreaPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/admin",
                element: <AdminPage/>
            }
        ]
    },
]);

export default router;