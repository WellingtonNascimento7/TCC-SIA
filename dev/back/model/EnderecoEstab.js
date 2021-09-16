const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const EnderecoEstab = new Schema({
	estabelecimento:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'estabelecimento',
		required: true		
	},
	cep:{
		type: Number,
		required: true
	},
	logradouro:{
		type: String,
		required: true
	},
	numero:{
		type: String,
		required: true
	},
	estado:{
		type: String,
		required: true
	},
	cidade:{
		type: String,
		required: true
	},
	complemento:{
		type: String,
		required: false
	},	
});

module.exports = mongoose.model("enderecoEstab", EnderecoEstab);