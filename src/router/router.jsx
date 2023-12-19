import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import Location from "../pages/Location";
import Materials from "../pages/Materials";
import Result from "../pages/Result";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/location",
        element: <Location />,
    },
    {
        path: "/materials",
        element: <Materials />,
    },
    {
        path: "/result",
        element: <Result />,
    },
]);
