import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./css/app.css";

import Navigation from "./components/Navigation";

// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForwardRefPage from "./pages/ForwardRefPage";
import memoPage from "./pages/memoPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Navigation />
            <div className="body">
                <Routes>
                    {/* <Route path="/" Component={HomePage} /> */}
                    {/* <Route path="/about" Component={AboutPage} /> */}
                    <Route path="/forwardref" Component={ForwardRefPage} />
                    <Route path="/memo" Component={memoPage} />
                    <Route path="/products" Component={ProductsPage} />
                    <Route Component={NotFoundPage} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
