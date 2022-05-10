import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Loading } from "./views/Loading/Loading";

export function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loading" element={<Loading />} />
            </Routes>
        </BrowserRouter>
    )
}