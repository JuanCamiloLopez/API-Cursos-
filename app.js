const express = require("express");
const app = express();

const routerProgramacion = require("./routers/programacion.js");
const routerMaterias = require("./routers/materias");
const infoCursos = require("./data/cursos.js");

//Routers
app.use("/api/cursos/programacion", routerProgramacion);
app.use("/api/cursos/materias", routerMaterias);

//routing
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log("el servidor se esta ejecutando en el puerto.");
});
