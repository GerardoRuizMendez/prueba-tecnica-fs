import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import AuthContext from "./core/context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContext>
    <App />
  </AuthContext>
);
