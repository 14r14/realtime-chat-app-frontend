import { Routes, Route } from "react-router-dom";
import Register from "./views/Auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
