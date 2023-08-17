import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./css/app.css";

import Navigation from "./components/Navigation";

// import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ForwardRefPage from "./pages/ForwardRefPage";
import MemoPage from "./pages/MemoPage";
import CreateContextPage from "./pages/CreateContextPage";
import UseContextPage from "./pages/UseContextPage";
import UseMemoPage from "./pages/UseMemoPage";
import UseEffectPage from "./pages/UseEffectPage";

import ProductsPage from "./pages/ProductsPage";
import CompositionPage from "./pages/CompositionPage";

function App() {
    return (
        // <React.StrictMode>
        <Router basename={process.env.PUBLIC_URL}>
            <Navigation />
            <div className="container">
                <Routes>
                    {/* <Route path="/" Component={HomePage} /> */}
                    <Route path="/forwardref" Component={ForwardRefPage} />
                    <Route path="/memo" Component={MemoPage} />
                    <Route
                        path="/createcontext"
                        Component={CreateContextPage}
                    />
                    <Route path="/usecontext" Component={UseContextPage} />
                    <Route path="/usememo" Component={UseMemoPage} />
                    <Route path="/useeffect" Component={UseEffectPage} />

                    <Route path="/composition" Component={CompositionPage} />

                    <Route path="/products" Component={ProductsPage} />

                    <Route Component={NotFoundPage} />
                </Routes>
            </div>
        </Router>
        // </React.StrictMode>
    );
}

export default App;
