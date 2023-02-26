const express = require("express");
const { infoCursos } = require("../data/cursos.js");

const routerMaterias = express.Router();

routerMaterias.use(express.json());

routerMaterias.get("/", (req, res) => {
  res.send(infoCursos.materias);
});

routerMaterias.get("/:calculo", (req, res) => {
  const materia = req.params.calculo;
  const respuestaDb = infoCursos.materias.filter(
    (clase) => clase.tema === materia
  );
  if (respuestaDb.length === 0) {
    return res
      .status(404)
      .send(`no se encontro ${materia} en la base de datos`);
  }

  res.send(JSON.stringify(respuestaDb));
});

routerMaterias.post("/", (req, res) => {
  let materia = req.body;
  infoCursos.materias.push(materia);
  res.json(infoCursos.materias);
});

routerMaterias.put("/:id", (req, res) => {
  const id = req.params.id;
  const materiaRemplazada = req.body;
  indiceMateria = infoCursos.materias.findIndex(
    (materiaRemplazo) => materiaRemplazo.id == id
  );
  if (indiceMateria >= 0) {
    infoCursos.materias[indiceMateria] = materiaRemplazada;
  }
  res.send(infoCursos.materias);
});

routerMaterias.patch("/:id", (req, res) => {
  const id = req.params.id;
  const actualizarDatos = req.body;

  indiceMateria = infoCursos.materias.findIndex((materia) => materia.id == id);

  if (indiceMateria >= 0) {
    const materiaRemplazada = infoCursos.materias[indiceMateria];
    Object.assign(materiaRemplazada, actualizarDatos);
  }
  res.send(infoCursos.materias);
});

routerMaterias.delete("/:id", (req, res) => {
  id = req.params.id;
  indice = infoCursos.materias.findIndex((idToDelete) => idToDelete.id == id);

  if (indice >= 0) {
    infoCursos.materias.splice(indice, 1);
  }
  res.send(infoCursos.materias);
});

module.exports = routerMaterias;
