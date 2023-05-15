import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import LandingPage from "../pages";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
            </Route>
        </Routes>
    )
}
export default Routing;