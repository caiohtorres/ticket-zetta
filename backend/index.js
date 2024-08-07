const express = require("express");
const routes = require("./routes");
const connectionDB = require("./config/dbConfig");
const cors = require("cors");

const app = express();
const port = 5555;

connectionDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());
app.use(routes);

app.listen(port, () =>
  console.log("Rodando com express na porta " + port + "!")
);
