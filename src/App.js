import { Routes, Route } from "react-router-dom";
import Login from "./views/Auth/LoginPage";
import Register from "./views/Auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
