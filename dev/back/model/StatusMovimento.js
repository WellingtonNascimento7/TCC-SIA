const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const StatusMovimento = new Schema({
	estabelecimento:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'estabelecimento',
		required: true		
	},
	usuario:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'usuario',
		required: true		
	},
	status:{
		type: Number,
		required: true,
		min: 1, 
		max: 99
	},
	datainsercao:{
		type: Date,
		require: true,
		defaut: Date.now()
	},	
});

module.exports = mongoose.model("statusMovimento", StatusMovimento);