import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Texter from "./pages/Texter/Texter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>

        <Route
          path="/about"
          element={
            <div className="about">
              This is some information about the Website Texter
            </div>
          }
        ></Route>
        <Route path="/texter" element={<Texter />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
