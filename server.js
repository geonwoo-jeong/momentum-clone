var static = require("node-static");

var file = new static.Server("./");

require("http")
  .createServer((request, response) => {
    request
      .addListener("end", () => {
        file.serve(request, response);
      })
      .resume();
  })
  .listen(8080);
