const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Estabelecimento = new Schema({
	nome:{
		type: String,
		required: true
	},
	dataCadastro:{
		type: Date,
		required: true,
		defaut: Date.now()
	},
	
});

module.exports = mongoose.model("estabelecimento", Estabelecimento);