// Bibliotecas
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./router/rotasUser');
const routesEstab = require('./router/rotasEstabelecimentos');
const routesStatus = require('./router/rotasStatus');
const routesGeoloc = require('./router/rotasGeolocalizacao');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cors = require("cors");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)
//politica de cors
app.use(cors());

//const handlebars = require('express-handlebars');

//Config
	// Sessao
		app.use(session({
			secret: "TCCSIA",
			resave: true,
			saveUninitialized: true
		}));

		app.use(passport.initialize());
		app.use(passport.session());
		app.use(flash());

	// Middleware
		app.use((req, res, next) => {			
			res.locals.sucess_msg = req.flash("sucess_msg");
			res.locals.error_msg = req.flash("error_msg");
			res.locals.error = req.flash("error");
			res.locals.user = req.user || null;			
			next();
		})
	//Body-Parser
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());

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
	app.use('/s', routesStatus);
	app.use('/g', routesGeoloc);
	mongoose.set('useFindAndModify', false);



//Porta
let port = 8081;
app.listen(port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});


