const express = require ('express');
const router = express.Router();
const {admin} = require("../config/admin");
// importa controlador 'apiController.js' da pasta: 
const estabController = require('../controllers/estabController');
const passport = require('passport');
//const mongoose = require ('mongoose');
//require ("../model/Usuario")
//const Usuarios = mongoose.model("Usuario");

// url do teste será: http://localhost:8081/api/teste
//router.get('/teste', estabController.test);

// Listar
router.get('/estab', estabController.listaestab);

router.get('/estab/:id', estabController.estab);


// Adicionar

router.post('/estab', admin, estabController.create);

// Atualizar
router.put('/estab/:id', admin, estabController.update);

// Deletar
router.delete('/estab/:id', admin, estabController.delete);

//PESQUISAR
router.get('/estab/pesquisa/:busca', estabController.pesquisa);

//GEOLOCALIZAÇÃO
router.get('/geolo', estabController.estabProximo);

/*router.get('/', (req, res) => {
	res.render("estab/index");
})*/
module.exports = router;