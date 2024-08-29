import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { TaskContextProvider } from "./context/TaskContext";

const App = () => {
    return (
        <div className="container">
            <TaskContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </TaskContextProvider>
        </div>
    );
};

export default App;
