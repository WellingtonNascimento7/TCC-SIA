const Estab = require('../model/Estabelecimento');

exports.test = function (req, res) {
  res.send('Olá! Teste ao Controller');
};

// TODO: listar pontos de interesse da BD
exports.details = function (req, res) {
  res.send({type: 'GET'});
};

// ADICIONAR ESTABELECIMENTO




exports.create = (req, res) => { 
  Estab.create({nome: req.body.nome, dataCadastro: req.body.dataCadastro}).then((estab) => {
  res.send(estab);
  });
};

/*exports.create = function (req, res) {
  res.send({
   type: 'POST',
   name: req.body.nome,
   rank: req.body.dataCadastro});
};*/

// ATUALIZAR ESTABELECIMENTO
//exports.update = function (req, res) {
//  res.send({type: 'PUT'});
//};

exports.update = (req, res, next) => {
   Estab.findByIdAndUpdate({_id: req.params.id},
                    req.body).then(() =>{ //o findOne seleciona o que usuario q foi atualizado
     Estab.findOne({_id: req.params.id}).then((estab) => {
       res.send(estab);
     });
   }).catch(next);
};

// DELETAR ESTABELECIMENTO
//exports.delete = function (req, res) {
//  res.send({type: 'DELETE'});
//};

// o next serve só para não travar o programa
exports.delete = (req, res, next) => {
  Estab.findByIdAndRemove({_id: req.params.id}).then((estab) =>{
    res.send(estab);
  }).catch(next);
};

// SELECT * FROM
exports.listaestab = (req, res) => {
   Estab.find({}).then((pi) => {
   res.send(pi);
   });
};

// SELECIONA ESTABELECIMENTO PELO ID
/*exports.selecionausuario = (req, res) => {
   User.find({_id: req.params.id}).then((user) => {
       res.send(user);
     });
   };*/