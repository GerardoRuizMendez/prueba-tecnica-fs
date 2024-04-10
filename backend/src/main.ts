import dotenv from "dotenv";
dotenv.config();

import server from "./server";

function main() {
  server.listen(server.get("port"));
  console.log("Server on port", server.get("port"));
}

main();
