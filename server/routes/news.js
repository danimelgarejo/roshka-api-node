const express = require("express");

const app = express();
const fetch = require("node-fetch");

app.get("/roshka", (req, res) => {
  //recuperamos los parametros que nos llegan por url
  let param = req.query;

  const q = param.q;

  if (!q) {
    return res
      .status(400)
      .json({ codigo: "g268", error: "Parámetros inválidos" });
  } else {
    let url = `https://www.abc.com.py/buscar/${q}`;

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        let notices = data.split("globalContent=");
        notices = notices[1];
        let noticesJson = notices.split(";Fusion.globalContentConfig=");
        noticesJson = noticesJson[0];

        let noticias = JSON.parse(noticesJson);
        if (noticias.metadata.total_hits === 0) {
          let error =
            " No se encuentran noticias para el texto" +
            " " +
            noticias.metadata.q;
          return res.status(404).json({ codigo: "g267", error: error });
        }
        res.json({
          ok: true,
          noticias,
        });
      })
      .catch((err) =>
        res.status(500).json({
          codigo: "g100",
          error: "Error interno del servidor",
        })
      );
  }
});

module.exports = app;
