import { Routes, Route, Navigate } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/first" />} />
                <Route path="/first" element={<FirstPage />} />
                <Route path="/second" element={<SecondPage />} />
            </Routes>
        </>
    );
}

export default App;
