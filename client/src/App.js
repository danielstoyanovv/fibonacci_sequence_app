import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fib from "./Fib";
import Navbar from "./components/Navbar";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<Fib/>}
                        >
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;