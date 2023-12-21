import "./App.css";
import TotalAns from "./totalAns";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/total" element={<TotalAns />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
