const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
	nome:{
		type: String,
		required: true
	},
	nascimento:{
		type: Date,
		required: true,
		defaut: Date.now()
	},
	telefone:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	senha:{
		type: String,
		required: true
	}
});

module.exports = mongoose.model("usuario", Usuario);