const express = require("express");
var router = express.Router();
var Cadastro = require("./app/models/cadastro");

router.use(function(req, res, next) {
  console.log("Algo está acontecendo aqui....");
  next();
});

//Rota exemplo:
router.get("/", function(req, res) {
  res.json({ message: "Beleza!" });
});

//API's
//========================================================================

//Criando uma instancia das Rotas via Express:
var router = express.Router();

//Rotas que terminam com '/cadastros' (serve: GET all & POST)
router
  .route("/cadastros")

  /* 1- Método: Criar Cadastro (acessar em: http://localholst:3000/api/cadastros)  */
  .post(function(req, res) {
    var cadastro = new Cadastro();

    //Seta os campos do cadastro (request):
    cadastro.nome = req.body.nome;
    cadastro.email = req.body.email;
    cadastro.telefone = req.body.telefone;
    cadastro.endereco = req.body.endereco;

    cadastro.save(function(error) {
      if (error) res.send("Erro ao tentar salvar o cadastro: " + error);

      res.json({ message: "Usuario cadastrado." });
    });
  })

  /* 2- Método: Seleciona todos os Cadastro (acessar em: http://localholst:3000/api/cadastros)  */
  .get(function(req, res) {
    Cadastro.find(function(error, cadastros) {
      if (error) res.send("Erro ao selecionar todos os cadastros: " + error);

      res.json(cadastros);
    });
  });

//Rotas terminadas em '/cadastros/:cadastro_id' (Vao servir tanto para: GET, PUT & DELETE: id)
router
  .route("/cadastros/:cadastro_id")

  /* 3- Método: Selecionar por Id: (acessar em: GET http://localhost:3000/api/cadastros/:cadastro_id) */
  .get(function(req, res) {
    //Função para selecionar um cadastro por ID - logo ira verificar se caso nao encontrar
    //um determinado cadastro pelo id... retorna uma mensagem de error:
    Cadastro.findById(req.params.cadastro_id, function(error, cadastro) {
      if (error) res.send("ID do cadastro nao encontrado. " + error);

      res.json(cadastro);
    });
  })

  /* 4- Método: Atualizar por ID: (http://localhost:3000/api/cadastros/:cadastro_id) */
  .put(function(req, res) {
    //Primeiro: para atualizar, primeiro acha o 'ID' do 'cadastro':
    Cadastro.findById(req.params.cadastro_id, function(error, cadastro) {
      if (error) res.send("ID do cadastro nao encontrado. " + error);

      //Segundo:
      cadastro.nome = req.body.nome;
      cadastro.email = req.body.email;
      cadastro.telefone = req.body.telefone;
      cadastro.endereco = req.body.endereco;

      //Terceiro: Depois de atualizar os dados, salvar as propriedades:
      cadastro.save(function(error) {
        if (error) res.send("Erro ao atualizar o cadastro. " + error);

        res.json({ message: "Cadastro atualizado com sucesso" });
      });
    });
  })

  /* 5- Método: Excluir por ID (acessar: http://localhost:3000/api/cadastros/:cadastro_id)  */
  .delete(function(req, res) {
    Cadastro.remove(
      {
        _id: req.params.cadastro_id
      },
      function(error) {
        if (error) res.send("ID do cadastro nao encontrado. " + error);

        res.json({ message: "Cadastro excluido!" });
      }
    );
  });

module.exports = router;
