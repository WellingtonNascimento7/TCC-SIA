const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
const geolocalizacaoController = require('../controllers/geolocalizacaoController');


router.post('/distancia', geolocalizacaoController.distancia);



/*router.get('/', (req, res) => {
	res.render("estab/index");
})*/
module.exports = router;