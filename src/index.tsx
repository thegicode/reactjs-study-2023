import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import ForwardRef from "./ForwardRef";
import ForwardRef2 from "./ForwardRef2";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        {/* <App /> */}

        <h2>ForwardRef</h2>

        <h3>1. Focusing a text input</h3>
        <ForwardRef />

        <h3>2. Playing and pausing a video</h3>
        <ForwardRef2 />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
