const Estab = require('../model/Estabelecimento');
//const Endereco = require('./enderecoController');
const Endereco = require('../model/EnderecoEstab');
exports.test = function (req, res) {
  res.send('Olá! Teste ao Controller');
};

// ADICIONAR ESTABELECIMENTO
exports.create = (req, res) => { 
  Estab.create({nome: req.body.nome, horariofunc: req.body.horariofunc}).then((estab) => {
  Endereco.create({cep: req.body.cep, logradouro: req.body.logradouro, numero: req.body.numero, 
    estado: req.body.estado, cidade: req.body.cidade, complemento: req.body.complemento, estabelecimento: estab._id }).then((endereco) =>{
  res.send(endereco);})
  });
};

 //ATUALIZA ESTABELECIMENTO
exports.update = (req, res, next) => {
   Estab.findOneAndUpdate({_id: req.params.id}, {nome: req.body.nome, horariofunc: req.body.horariofunc}).then(() =>{
    Endereco.findOneAndUpdate({estabelecimento: req.params.id},
                    {cep: req.body.cep, logradouro: req.body.logradouro, numero: req.body.numero, 
                      estado: req.body.estado, cidade: req.body.cidade, complemento: req.body.complemento}).then(() =>{ //o findOne seleciona o que usuario q foi atualizado
      
     Endereco.findOne({estabelecimento: req.params.id}).populate('estabelecimento').then((endereco) => {
       res.send(endereco);
     });
   })
   
   }).catch(next);
};

// DELETAR ESTABELECIMENTO
exports.delete = (req, res, next) => {  
  Endereco.findOneAndDelete({estabelecimento: req.params.id}).populate('estabelecimento').then((endereco) =>{
    Estab.findOneAndDelete({_id: req.params.id}).then(() =>{
      res.send(endereco);
    })    
  }).catch(next);
};

// SELECT * FROM
exports.listaestab = (req, res) => {
   Endereco.find({}).populate('estabelecimento').then((pi) => {
   res.send(pi);
   });
};

//SELECIONA UM ESTABELECIMENTO
exports.estab = (req, res) => {
   Endereco.findOne({estabelecimento: req.params.id}).populate('estabelecimento').then((pi) => {
   res.send(pi);});
};

// SELECIONA ESTABELECIMENTO PELO ID
/*exports.selecionausuario = (req, res) => {
   User.find({_id: req.params.id}).then((user) => {
       res.send(user);
     });
   };*/