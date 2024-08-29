import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Assets from "./Assets.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
        <ToastContainer theme="colored" autoClose={2000} />
    </StrictMode>
);
