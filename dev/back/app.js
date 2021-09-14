// Bibliotecas
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./router/rotasUser');
const routesEstab = require('./router/rotasEstabelecimentos');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cors = require("cors");

//politica de cors
app.use(cors());

//const handlebars = require('express-handlebars');

//Config
	//Body-Parser
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
	//Handlebars
	//	app.engine('handlebars', handlebars({defaultLayout: 'main'}));
	//	app.set('view engine', 'handlebars');

	//MongoDB
		mongoose.Promise = global.Promise;
		mongoose.connect('mongodb://localhost/projetotcc').then(() => {
			console.log("Conectado no banco");
		}).catch((err) => {
			console.log("Erro ao se conectar no banco: " + err);
		})
	//Front
		app.use(express.static(path.join(__dirname, "Public"))); 
//Rotas
	app.get('/', (req, res) => {
		res.send('Login')
	})

	app.use('/user', routes);
	app.use('/e', routesEstab);



//Porta
let port = 8081;
app.listen(port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});


