const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
const statusController = require('../controllers/statusController');

router.get('/status', statusController.listastatus);

router.get('/status/:id', statusController.status);

router.get('/status/estab/:estab', statusController.statusestab)


// Adicionar

router.post('/status', statusController.create);

// Atualizar
router.put('/status/:id', statusController.update);

// Deletar
router.delete('/status/:id', statusController.delete);

/*router.get('/', (req, res) => {
	res.render("estab/index");
})*/
module.exports = router;