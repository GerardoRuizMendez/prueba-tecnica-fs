import dotenv from "dotenv";
dotenv.config();

import server from "./server";

function main() {
  const port = server.get("port");

  server.listen(port, "0.0.0.0", function () {});
  console.log("Server on port", port);
}

main();
