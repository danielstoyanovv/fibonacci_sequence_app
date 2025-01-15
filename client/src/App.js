import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./pages/OtherPage";
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
                        <Route
                            path="/other-page"
                            element={<OtherPage/>}
                        >
                        </Route>

                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;