import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

// navigation
// import Navigation from "./components/Navigation";
// import Header from "./components/Header";

// side
import SideHooks from "./components/SideHooks";
import SidePractical from "./components/SidePractical";

// contents
// hooks
import UseEffectPage from "./pages/UseEffectPage";
import UseMemoPage from "./pages/UseMemoPage";
import UseCallbackPage from "./pages/UseCallbackPage";
import MemoPage from "./pages/MemoPage";
import ForwardRefPage from "./pages/ForwardRefPage";
import UseContextPage from "./pages/UseContextPage";
import CompositionPage from "./pages/CompositionPage";

// practical
import ProductsPage from "./pages/ProductsPage";

// import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        // <React.StrictMode>
        <Router basename={process.env.PUBLIC_URL}>
            <Layout>
                <>
                    <aside className="side">
                        <Routes>
                            <Route path="/hooks/*" element={<SideHooks />} />
                            <Route
                                path="/practical/*"
                                element={<SidePractical />}
                            />
                        </Routes>
                    </aside>

                    <main className="contents">
                        <Routes>
                            <Route path="/hooks" element={<UseEffectPage />} />
                            <Route
                                path="/hooks/useeffect"
                                element={<UseEffectPage />}
                            />
                            <Route
                                path="/hooks/usememo"
                                element={<UseMemoPage />}
                            />
                            <Route
                                path="/hooks/usecallback"
                                element={<UseCallbackPage />}
                            />
                            <Route path="/hooks/memo" element={<MemoPage />} />
                            <Route
                                path="/hooks/forwardref"
                                element={<ForwardRefPage />}
                            ></Route>
                            <Route
                                path="/hooks/usecontext"
                                element={<UseContextPage />}
                            />
                            <Route
                                path="/hooks/composition"
                                element={<CompositionPage />}
                            />

                            <Route
                                path="/practical/"
                                element={<ProductsPage />}
                            />
                            <Route
                                path="/practical/products"
                                element={<ProductsPage />}
                            />
                        </Routes>
                        {/* <Routes>
                        
                        

                       

                        <Route path="/products" Component={ProductsPage} />

                        <Route Component={NotFoundPage} />
                    </Routes> */}
                    </main>
                </>
            </Layout>
        </Router>
        // </React.StrictMode>
    );
}

export default App;
