import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./css/app.css";

import Navigation from "./components/Navigation";

// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForwardRefPage from "./pages/ForwardRefPage";
import MemoPage from "./pages/MemoPage";
import CreateContextPage from "./pages/CreateContextPage";
import UseContextPage from "./pages/UseContextPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
    return (
        // <React.StrictMode>
        <Router basename={process.env.PUBLIC_URL}>
            <Navigation />
            <div className="body">
                <Routes>
                    {/* <Route path="/" Component={HomePage} /> */}
                    {/* <Route path="/about" Component={AboutPage} /> */}
                    <Route path="/forwardref" Component={ForwardRefPage} />
                    <Route path="/memo" Component={MemoPage} />
                    <Route
                        path="/createcontext"
                        Component={CreateContextPage}
                    />
                    <Route path="/usecontext" Component={UseContextPage} />

                    <Route path="/products" Component={ProductsPage} />
                    <Route Component={NotFoundPage} />
                </Routes>
            </div>
        </Router>
        // </React.StrictMode>
    );
}

export default App;
