import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import ForwardRefPage from "./pages/ForwardRefPage";
import Navigation from "./components/Navigation";
import "./css/app.css";

function App() {
    return (
        <Router>
            <Navigation />
            <div className="body">
                <Routes>
                    {/* <Route path="/" Component={HomePage} /> */}
                    {/* <Route path="/about" Component={AboutPage} /> */}
                    <Route path="/forwardref" Component={ForwardRefPage} />
                    <Route Component={NotFoundPage} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
