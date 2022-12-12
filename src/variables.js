// selectServer.   1 = deployed server;   2 = development server
let selectServer = 1;
let server =
  selectServer === 1
    ? "https://petfinderapi.addisondubay.com"
    : "http://localhost:4000";

module.exports = {
  server: server,
  brand: "The Dog Finder",
};
