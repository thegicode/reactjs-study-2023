import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./css/App.module.css";

// layout
import Layout from "./components/Layout";

//  side
import SideHooks from "./components/SideHooks";
import SidePractical from "./components/SidePractical";

// hooks pages
const UseEffectPage = lazy(() => import("./pages/UseEffectPage"));
const UseMemoPage = lazy(() => import("./pages/UseMemoPage"));
const UseCallbackPage = lazy(() => import("./pages/UseCallbackPage"));
const MemoPage = lazy(() => import("./pages/MemoPage"));
const ForwardRefPage = lazy(() => import("./pages/ForwardRefPage"));
const UseContextPage = lazy(() => import("./pages/UseContextPage"));
const CustomHooksPage = lazy(() => import("./pages/CustomHooksPage"));
const CompositionPage = lazy(() => import("./pages/CompositionPage"));

// practical pages
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AddToCartPage = lazy(() => import("./pages/AddToCartPage"));

function App() {
    return (
        <React.StrictMode>
            <Router basename={process.env.PUBLIC_URL}>
                <Suspense fallback={<div>Loading...</div>}>
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
                                        path="/hooks/customhooks"
                                        element={<CustomHooksPage />}
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
                </Suspense>
            </Router>
        </React.StrictMode>
    );
}

export default App;
