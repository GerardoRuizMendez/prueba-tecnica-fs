import { useState } from "react";
import user from "../models/user";
import UpdateUser from "../screens/UpdateUser";
import DeleteUser from "../screens/DeleteUser";

export default function UserCard({ user }: { user: user }) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <div className="bg-gray-950 rounded-2xl mb-5">
        <div className="h-auto flex justify-center">
          <img
            className="w-5/6 rounded-3xl md:-mt-24 pt-5 md:pt-0"
            src="https://thumbs.dreamstime.com/b/mujer-gris-del-placeholder-de-la-foto-persona-131683043.jpg"
            alt="Placeholder"
          />
        </div>
        <div className="text-center">
          <h3 className="my-8 font-bold text-xl">{`${user.nombre} ${user.apellido_paterno}`}</h3>
          <p className="my-5 text-gray-500">{user.rol}</p>
        </div>
        <div className="flex flex-row items-center justify-evenly my-4">
          <button
            onClick={() => setEditModal(!editModal)}
            className="text-white py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded"
          >
            Actualizar
          </button>
          <button
            className="text-white py-2 px-4 rounded bg-red-500 hover:bg-red-600"
            onClick={() => setDeleteModal(!deleteModal)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <UpdateUser isOpen={editModal} setOpen={setEditModal} usuario={user} />
      <DeleteUser
        isOpen={deleteModal}
        setOpen={setDeleteModal}
        id={user.id || 0}
      />
    </>
  );
}
