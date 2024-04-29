import dotenv from "dotenv";
dotenv.config();

import server from "./server";

function main() {
  console.log("Server on port", server.get("port"));
  console.log("is this working?");
}

main();
