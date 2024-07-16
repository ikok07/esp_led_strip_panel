import {Routes, Route} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}