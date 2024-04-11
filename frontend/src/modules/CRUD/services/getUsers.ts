export default function getUsers(accessToken: string) {
  return fetch("http://localhost:3000/api/v1/all-users", {
    headers: { authorization: `Bearer ${accessToken}` },
  })
    .then((res) => {
      if (res.status != 200) throw new Error("Error");
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
