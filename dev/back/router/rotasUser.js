const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
const userController = require('../controllers/userController');
//const mongoose = require ('mongoose');
//require ("../model/Usuario")
//const Usuarios = mongoose.model("Usuario");

// url do teste será: http://localhost:8081/user/teste
router.get('/teste', userController.test);

// Listar
router.get('/usuarios',userController.listausuarios);

router.get('/usuarios/:id',userController.selecionausuario);


// Adicionar
router.post('/usuario2',userController.add);

router.post('/usuario',userController.create);

// Atualizar
router.put('/usuario/:id',userController.update);

// Deletar
router.delete('/usuario/:id',userController.delete);

// http://localhost:8081/user/logar
router.post('/logar',userController.logar);

router.get('/', (req, res) => {
	res.render("usuario/index");
})
module.exports = router;