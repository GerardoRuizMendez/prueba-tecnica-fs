import { Dispatch, SetStateAction, useContext } from "react";
import { Modal } from "flowbite-react";
import deleteUser from "../services/deleteUser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../core/context/AuthContext";

export default function DeleteUser({
  isOpen,
  setOpen,
  id,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}) {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    deleteUser(id, accessToken).then(() => {
      navigate(0);
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
        <Modal.Header>Eliminar usuario</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-1/5 text-red-700 m-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <p>
              ¿Seguro que quieres eliminar este usuario? Esta acción no puede
              ser deshecha
            </p>
            <div className="flex flex-row gap-5 items-center mt-10">
              <input
                type="button"
                value="Eliminar"
                className="text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded"
                onClick={handleSubmit}
              />
              <input
                type="button"
                value="Cancelar"
                className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded"
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
