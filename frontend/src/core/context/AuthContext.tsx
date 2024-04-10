import { createContext, useState } from "react";

export let AuthContext: React.Context<{
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}>;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem("accessToken") || ""
  );

  AuthContext = createContext({ accessToken, setAccessToken });
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
