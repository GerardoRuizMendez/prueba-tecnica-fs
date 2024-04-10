export default function deleteUser(id: number, accessToken: string) {
  return fetch(`http://localhost:3000/api/v1/delete/${id}`, {
    method: "DELETE",

    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 400 || res.status == 500) throw new Error("Error");
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
