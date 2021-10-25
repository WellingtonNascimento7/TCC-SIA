const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
const estabController = require('../controllers/estabController');
//const mongoose = require ('mongoose');
//require ("../model/Usuario")
//const Usuarios = mongoose.model("Usuario");

// url do teste será: http://localhost:8081/api/teste
//router.get('/teste', estabController.test);

// Listar
router.get('/estab', estabController.listaestab);

router.get('/estab/:id', estabController.estab);


// Adicionar

router.post('/estab', estabController.create);

// Atualizar
router.put('/estab/:id', estabController.update);

// Deletar
router.delete('/estab/:id', estabController.delete);

//PESQUISAR
router.get('/estab/pesquisa/:busca', estabController.pesquisa);

//GEOLOCALIZAÇÃO
router.get('/geolo', estabController.estabProximo);

/*router.get('/', (req, res) => {
	res.render("estab/index");
})*/
module.exports = router;