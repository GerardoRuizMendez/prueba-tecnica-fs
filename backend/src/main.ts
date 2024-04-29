import dotenv from "dotenv";
dotenv.config();

import server from "./server";

function main() {
  server.listen(server.get("port"), "0.0.0.0");
  console.log("Server on port", server.get("port"));
  console.log("is this working?");
}

main();
