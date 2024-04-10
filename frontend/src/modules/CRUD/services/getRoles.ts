export default function getRoles(accessToken: string) {
  return fetch("http://localhost:3000/api/v1/get-roles", {
    headers: { authorization: `Bearer ${accessToken}` },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
