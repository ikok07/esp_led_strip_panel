import {Route} from "react-router-dom";

export default function Routes() {
    return <Routes>
        {/*<Route path="/asd" element={<h1>Test</h1>}/>*/}
        <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
}