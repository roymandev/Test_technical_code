const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname === "/segitiga" && req.method === "GET") {
    const numbers = query.number;

    const result = numbers.split("").map((value, index) => {
      const zero = Array(index + 1)
        .fill("0")
        .join("");

      return `${value}${zero}`;
    });

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ data: result }));
    res.end();
  } else if (
    parsedUrl.pathname === "/bilangan-ganjil" &&
    req.method === "GET"
  ) {
    const maxNumber = query.maxNumber;
    const result = [];

    for (let index = 0; index <= maxNumber; index++) {
      if (index && index % 2 !== 0) result.push(index);
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ data: result }));
    res.end();
  } else if (parsedUrl.pathname === "/bilangan-prima" && req.method === "GET") {
    const maxNumber = query.maxNumber;
    const result = [];

    numbersLoop: for (let number = 0; number <= maxNumber; number++) {
      if (number <= 1) continue numbersLoop;

      for (let naturalNumber = 2; naturalNumber < number; naturalNumber++) {
        // If current natural number can divide number evenly
        if (number % naturalNumber === 0) continue numbersLoop;
      }

      result.push(number);
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify({ data: result }));
    res.end();
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
