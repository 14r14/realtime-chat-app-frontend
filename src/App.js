import { useContext } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Message from "./components/Message";
import AuthContext from "./store/AuthContext";
import Login from "./views/Auth/LoginPage";
import Register from "./views/Auth/RegisterPage";
import Index from "./views/Index";

function App() {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      {!authCtx.isLoggedIn && (
        <>
          <Link to="/auth/login">Login</Link><br />
          <Link to="/auth/register">Register</Link>
        </>
      )}
      <Routes>
        {authCtx.isLoggedIn && <Route path="/" element={<Index />} />}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/msg" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;
