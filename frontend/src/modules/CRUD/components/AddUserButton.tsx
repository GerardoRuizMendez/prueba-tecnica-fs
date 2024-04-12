import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../core/context/AuthContext";
import getCurrentUser from "../services/getCurrentUser";

export default function AddUserButton() {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  useState(() => {
    getCurrentUser(accessToken).then((res) => {
      if (res.rol == "Administrador") setVisible(true);
    });
  });

  if (!visible) return <></>;
  return (
    <div className="w-5/6 flex justify-start mx-4">
      <button
        className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded mt-8"
        onClick={() => {
          navigate("/agregar-usuario");
        }}
      >
        Agregar usuario
      </button>
    </div>
  );
}
