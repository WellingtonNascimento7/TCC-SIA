const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

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
	bairro:{
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
	geometry: GeoSchema

});

module.exports = mongoose.model("enderecoEstab", EnderecoEstab);