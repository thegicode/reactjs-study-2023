import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/app.css";

// navigation
// import Navigation from "./components/Navigation";
import Header from "./components/Header";

// side
import Hooks from "./components/Hooks";

// import HomePage from "./pages/HomePage";
// import NotFoundPage from "./pages/NotFoundPage";
import ForwardRefPage from "./pages/ForwardRefPage";
// import MemoPage from "./pages/MemoPage";
// import CreateContextPage from "./pages/CreateContextPage";
// import UseContextPage from "./pages/UseContextPage";
// import UseMemoPage from "./pages/UseMemoPage";
// import UseCallbackPage from "./pages/UseCallbackPage";
import UseEffectPage from "./pages/UseEffectPage";

// import ProductsPage from "./pages/ProductsPage";
// import CompositionPage from "./pages/CompositionPage";

function App() {
    return (
        // <React.StrictMode>
        <Router basename={process.env.PUBLIC_URL}>
            <Header />
            {/* <Navigation /> */}

            <div className="container">
                <aside className="side">
                    <h2>Side Menu</h2>
                    <Routes>
                        <Route path="/hooks" element={<Hooks />} />
                    </Routes>
                </aside>

                <main className="contents">
                    <Routes>
                        <Route
                            path="/forwardref"
                            element={<ForwardRefPage />}
                        ></Route>
                        <Route path="/useeffect" element={<UseEffectPage />} />

                        {/* <Route path="/practical"></Route> */}
                    </Routes>
                    {/* <Routes>
                        <Route path="/forwardref" Component={ForwardRefPage} />
                        <Route path="/memo" Component={MemoPage} />
                        <Route
                            path="/createcontext"
                            Component={CreateContextPage}
                        />
                        <Route path="/usecontext" Component={UseContextPage} />
                        <Route path="/usememo" Component={UseMemoPage} />
                        <Route
                            path="/usecallback"
                            Component={UseCallbackPage}
                        />

                        <Route
                            path="/composition"
                            Component={CompositionPage}
                        />

                        <Route path="/products" Component={ProductsPage} />

                        <Route Component={NotFoundPage} />
                    </Routes> */}
                </main>
            </div>
        </Router>
        // </React.StrictMode>
    );
}

export default App;
