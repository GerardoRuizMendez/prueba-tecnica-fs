import { useNavigate } from "react-router-dom";
import InputSelect from "../../../core/components/InputSelect";
import InputText from "../../../core/components/InputText";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../core/context/AuthContext";
import rol from "../models/rol";
import getRoles from "../services/getRoles";
import user from "../models/user";
import addUser from "../services/addUser";
import getCurrentUser from "../services/getCurrentUser";

export default function AddUser() {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [roles, setRoles] = useState<rol[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRoles(accessToken).then((res) => setRoles(res));
  }, []);

  useEffect(() => {
    if (accessToken == "") {
      navigate("/");
    }
    getCurrentUser(accessToken).then((res) => {
      if (res.rol == "Administrador") navigate("/");
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const newUser: user = {
      nombre: (elements.namedItem("nombre") as HTMLInputElement).value,
      apellido_paterno: (
        elements.namedItem("apellido_paterno") as HTMLInputElement
      ).value,
      apellido_materno: (
        elements.namedItem("apellido_materno") as HTMLInputElement
      ).value,
      correo: (elements.namedItem("correo") as HTMLInputElement).value,
      numero_telefonico: (
        elements.namedItem("numero_telefonico") as HTMLInputElement
      ).value,
      contrasena:
        (elements.namedItem("contrasena") as HTMLInputElement).value || "",
      fecha_nacimiento: (
        elements.namedItem("fecha_nacimiento") as HTMLInputElement
      ).value,
      rol: (elements.namedItem("rol") as HTMLInputElement).value,
    };
    addUser(newUser, accessToken)
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center text-white py-5">
      <h2 className="text-5xl mt-5">Agregar usuario</h2>
      <div className="w-11/12 md:w-7/12 mb-5 flex justify-start">
        <button
          className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded mt-8"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver
        </button>
      </div>
      <div className="w-11/12 md:w-7/12 bg-white text-black p-8 pt-14 mb-5 rounded">
        <form className="w-full" onSubmit={handleSubmit}>
          <InputText name="nombre" label="Nombre" />
          <InputText name="apellido_paterno" label="Apellido paterno" />
          <InputText label="Apellido materno" name="apellido_materno" />
          <InputSelect
            label="Rol"
            options={roles.map((rol) => rol.nombre)}
            values={roles.map((rol) => rol.id || 0)}
            name="rol"
          />
          <InputText label="Correo" name="correo" />
          <InputText
            type="number"
            label="Número telefónico"
            name="numero_telefonico"
          />
          <InputText type="password" label="Contraseña" name="contrasena" />
          <InputText
            type="date"
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
          />

          {error && <p className="text-red-500 font-bold">Datos inválidos</p>}

          <div className="flex flex-col items-end">
            <input
              type="submit"
              value="Agregar"
              className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
