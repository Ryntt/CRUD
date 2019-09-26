//Chamadas dos pacotes:
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Cadastro = require("./app/models/cadastro");

mongoose.connect(
  "mongodb+srv://vlemos:crud@cluster0-1itie.azure.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

//Outra forma:
//mongoose.connect("mongodb://localhost:27017/crud", {
//  useNewUrlParser: true,
//  useFindAndModify: false
//});

//Configuração da variavel app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definindo a porta onde sera executada a api:
var port = process.env.port || 3000;

//Chamada das rotas:

app.use("/api", require("./routes"));

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);

app.use(require("./routes"));
