import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import { Favorite } from "./pages/Favorite/Favorite";
import { Home } from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
