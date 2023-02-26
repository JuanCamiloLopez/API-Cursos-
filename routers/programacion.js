const express = require("express");
const routerProgramacion = express.Router();
const { infoCursos } = require("../data/cursos.js");

routerProgramacion.get("/", (req, res) => {
  res.send(infoCursos.programacion);
});

//esto nos permitira extraer el cuerpo de la solicitud y poder trabajarla en formato json, esto se conoce como middleware, se ejecuta después de recibir una solicitud y antes de enviar una respuesta. tiene acceso al cuerpo de la solicitud, al objeto de la respuesta y al next(), una función que se llama para ejecutar el proximo middeleware.
routerProgramacion.use(express.json());

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }

  if (req.query.ordenar === "vistas") {
    return res.send(
      //el método sort nos permite ordenar una lista en base a un criterio y este se puede definir con una función flecha, a o b pasan a ser argumentos que me indican el orden.
      resultados.sort((a, b) => b.vistas - a.vistas)
    );
  }

  res.send(resultados);
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguajeP = req.params.lenguaje;
  const niveles = req.params.nivel;

  const respuesta = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguajeP && curso.nivel === niveles
  );

  if (respuesta.length === 0) {
    return res
      .status(404)
      .send(
        "no se encontro un prograga de formación con tales caracteristicas"
      );
  }

  res.send(respuesta);
});

routerProgramacion.post("/", (req, res) => {
  //vamos a extraer el cuerpo de la solicitud para poder incluir un curso nuevo.
  let cursoNuevo = req.body;
  infoCursos.programacion.push(cursoNuevo);
  //enviamos el nuevo arreglo para actulizarse con el método post
  res.send(infoCursos.programacion);
});

//pasamos un parametro unico del elemento a actualizar.
routerProgramacion.put("/:id", (req, res) => {
  //este método me permite actulizar una entidad en mi base de datos.
  const cursoACtualizado = req.body;
  const id = req.params.id;

  // con el método findIndex(), encuetro un índice a partir de un criterio establecido, si lo encuentra lo retorna, de lo contrario retorna -1. En este caso no utilizo la igualdad estricta porque estoy comparando dos tipos de datos distintos, un string que viene de la url y un tipo numerico.
  const indice = infoCursos.programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    infoCursos.programacion[indice] = cursoACtualizado;
  }
  res.send(infoCursos.programacion);
});

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = infoCursos.programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoModificar = infoCursos.programacion[indice];

    //Utilizamos el método Object.assing(); que nos permite modificar objetos que recibe como argumentos, el primer argumento es el objeto que queremos modificar y el segundo el cuerpo de la req que asignamos a una constante para posteriormente actualizar desde el index.http o método fetch cuando usamos react  desde el frontend.
    Object.assign(cursoModificar, infoActualizada);
  }
  res.send(infoCursos.programacion);
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = infoCursos.programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    infoCursos.programacion.splice(indice, 1);
  }
  res.send(infoCursos.programacion);
});

module.exports = routerProgramacion;
