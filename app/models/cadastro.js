var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Cadastro:
 *
 * ->Nome: String
 * ->Email: String
 * ->Telefone: Number
 * ->Endereço: String
 *
 */

var CadastroSchema = new Schema({
  nome: String,
  email: String,
  telefone: Number,
  endereco: String
});

module.exports = mongoose.model("Cadastro", CadastroSchema);
