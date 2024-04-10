export default function login(email: string, password: string) {
  return fetch(`${import.meta.env.VITE_URL_BASE}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status == 401 || res.status == 500) throw new Error("Error");
      return res.json();
    })
    .then((res) => {
      return res;
    });
}
