export default function deleteUser(id: number, accessToken: string) {
  return fetch(`${import.meta.env.VITE_URL_BASE}/api/v1/delete/${id}`, {
    method: "DELETE",

    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status != 200) throw new Error("Error");
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
