require("./config/config");

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./routes/index")); //se cargan las rutas

app.listen(process.env.PORT, () => {
    //console.log("Escuchando puerto: ", process.env.PORT);
});