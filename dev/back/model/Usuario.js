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
		unique: true,
		required: true
	},
	senha:{
		type: String,
		required: true
	},
	perfil:{
		type: Number,
		required: true,
		min: 0, 
		max: 1,
		defaut: 0
	}
});

//como só exitem dois perfis de acesso por enquanto o 1 é admin e o 0 é usuario padrão

module.exports = mongoose.model("usuario", Usuario);