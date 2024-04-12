import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../core/context/AuthContext";
import { useNavigate } from "react-router-dom";
import user from "../models/user";
import getUsers from "../services/getUsers";
import UserCard from "../components/UserCard";
import AddUserButton from "../components/AddUserButton";

export default function ListUsers() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState<user[]>([]);
  const [currentUsers, setCurrentUsers] = useState<user[]>([]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    getUsers(accessToken)
      .then((res) => {
        setUsers(res);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    if (accessToken == "") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setCurrentUsers(users.slice(8 * page, 8 * page + 8));
  }, [page, users]);

  if (!accessToken) return <></>;
  return (
    <div className="h-full flex flex-col justify-center items-center text-white pb-5">
      <h2 className="text-5xl mt-8">Usuarios</h2>
      <AddUserButton />

      <div className="w-5/6 flex justify-between mt-8 ">
        <button
          className="text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded disabled:bg-gray-600"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page == 0}
        >
          Anterior
        </button>
        <p className="px-10 text-2xl font-bold">{page + 1}</p>
        <button
          className="text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded disabled:bg-gray-600"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={users.length <= (page + 1) * 8}
        >
          Siguiente
        </button>
      </div>

      <div className="w-5/6 grid md:gap-y-24 mt-5 md:mt-28 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {currentUsers.map((user) => {
          return <UserCard user={user} key={user.id || 0} />;
        })}
      </div>
      <button
        className="text-white py-2 px-4 bg-red-500 hover:bg-red-600 rounded"
        onClick={() => {
          setAccessToken("");
          window.localStorage.removeItem("accessToken");
          navigate("login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
