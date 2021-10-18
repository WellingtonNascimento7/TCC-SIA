const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const TagsEstab = new Schema({
	enderecoEstab:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'enderecoEstab',
		required: true		
	},
	tags: [{type: String}],
	
});

module.exports = mongoose.model("tagsEstab", TagsEstab);