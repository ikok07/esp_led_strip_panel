import {Routes, Route} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Home from "../pages/Home.jsx";

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}