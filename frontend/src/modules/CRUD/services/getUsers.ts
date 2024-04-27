export default function getUsers(accessToken: string) {
  return fetch(`${import.meta.env.VITE_URL_BASE}/api/v1/all-users`, {
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
