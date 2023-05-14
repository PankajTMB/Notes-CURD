import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import IndexPage from "../pages";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
            </Route>
        </Routes>
    )
}
export default Routing;