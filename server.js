const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  //   console.log(req.url,  "\naaa\n\n", req.method, "\naaa\n\n",req.headers, "\naaa\n\n" + "aa");
  //   console.log(req.url);
  const RandNum = _.random(0,10);
  console.log(RandNum);

  res.setHeader("Content-Type", "text/html");

  //   res.write('<h1>Konichiwa, SP</h1>')
  //   res.write('<h2>Konichiwa again, SP</h2>')
  //   res.end()

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    case '/about-sp': 
      res.statusCode = 301;
      res.setHeader("Location", "/about")
      res.end();

    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
  });
});

server.listen(3001, "localhost", () => {
  console.log("localhost listening on port 3000");
});
