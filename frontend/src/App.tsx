import AddUser from "./modules/CRUD/screens/AddUser";
import ListUsers from "./modules/CRUD/screens/ListUsers";
import Login from "./modules/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListUsers />} />
        <Route path="/agregar-usuario" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
