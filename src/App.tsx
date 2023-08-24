import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

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
import AddToCartPage from "./pages/AddToCartPage";

// import NotFoundPage from "./pages/NotFoundPage";

import styles from "./css/App.module.css";

function App() {
    return (
        <React.StrictMode>
            <Router basename={process.env.PUBLIC_URL}>
                <Layout>
                    <>
                        <aside className={styles.side}>
                            <Routes>
                                <Route
                                    path="/hooks/*"
                                    element={<SideHooks />}
                                />
                                <Route
                                    path="/practical/*"
                                    element={<SidePractical />}
                                />
                            </Routes>
                        </aside>

                        <main className={styles.contents}>
                            <Routes>
                                <Route
                                    path="/hooks"
                                    element={<UseEffectPage />}
                                />
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
                                <Route
                                    path="/hooks/memo"
                                    element={<MemoPage />}
                                />
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
                                <Route
                                    path="/practical/addtocart"
                                    element={<AddToCartPage />}
                                />
                            </Routes>
                        </main>
                    </>
                </Layout>
            </Router>
        </React.StrictMode>
    );
}

export default App;
