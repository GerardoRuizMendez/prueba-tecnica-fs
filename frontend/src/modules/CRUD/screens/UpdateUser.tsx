import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Modal } from "flowbite-react";
import InputText from "../../../core/components/InputText";
import user from "../models/user";
import InputSelect from "../../../core/components/InputSelect";
import getRoles from "../services/getRoles";
import { AuthContext } from "../../../core/context/AuthContext";
import rol from "../models/rol";
import updateUser from "../services/updateUser";
import { useNavigate } from "react-router-dom";

export default function UpdateUser({
  isOpen,
  setOpen,
  usuario,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  usuario: user;
}) {
  const { accessToken } = useContext(AuthContext);
  const [roles, setRoles] = useState<rol[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) getRoles(accessToken).then((res) => setRoles(res));
  }, [isOpen]);

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
    updateUser(usuario.id || 0, newUser, accessToken)
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <>
      <Modal
        show={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>Actualizar usuario</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <InputText
              name="nombre"
              label="Nombre"
              defaultValue={usuario.nombre}
              feedback="Ingresa un nombre válido"
              regex={/^.{4,}$/}
            />
            <InputText
              name="apellido_paterno"
              label="Apellido paterno"
              defaultValue={usuario.apellido_paterno}
              feedback="Ingresa un apellido válido"
              regex={/^.{4,}$/}
            />
            <InputText
              label="Apellido materno"
              name="apellido_materno"
              defaultValue={usuario.apellido_materno}
              feedback="Ingresa un apellido válido"
              regex={/^.{4,}$/}
            />
            <InputSelect
              label="Rol"
              options={roles.map((rol) => rol.nombre)}
              values={roles.map((rol) => rol.id || 0)}
              name="rol"
            />
            <InputText
              label="Correo"
              name="correo"
              defaultValue={usuario.correo}
              feedback="Ingresa un correo válido"
              regex={
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
            />
            <InputText
              type="number"
              label="Número telefónico"
              name="numero_telefonico"
              defaultValue={usuario.numero_telefonico}
              feedback="Ingresa un numero telefónico válido"
              regex={/^[0-9]{10}$/}
            />
            <InputText
              type="date"
              label="Fecha de nacimiento"
              name="fecha_nacimiento"
              defaultValue={usuario.fecha_nacimiento.replace(
                "T06:00:00.000Z",
                ""
              )}
            />
            <div className="flex justify-end gap-2">
              <input
                type="submit"
                value="Actualizar"
                className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded"
              />
              <input
                type="submit"
                value="Cancelar"
                className="text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
