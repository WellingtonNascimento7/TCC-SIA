const User = require('../model/Usuario');

exports.test = function (req, res) {
  res.send('Olá! Teste ao Controller');
};

// TODO: listar pontos de interesse da BD
exports.details = function (req, res) {
  res.send({type: 'GET'});
};

// ADICIONAR USUARIO
exports.add = function (req, res) {
  res.send({type: 'POSTerrado'});
};

// adicionar novo ponto de interesse
/*exports.create = function (req, res) {
  console.log('You made a POST request: ', req.body);
  res.send({
   type: 'POST',
   name: req.body.name,
   nascimento: req.body.nascimento,
   telefone: req.body.telefone,
   email: req.body.email,
   senha: req.body.senha });
};*/


exports.create = (req, res) => { 
  User.create(req.body).then((user) => {
  res.send(user);
  });
};

// ATUALIZAR USUARIO
//exports.update = function (req, res) {
//  res.send({type: 'PUT'});
//};

exports.update = (req, res, next) => {
   User.findByIdAndUpdate({_id: req.params.id},
                    req.body).then(() =>{ //o findOne seleciona o que usuario q foi atualizado
     User.findOne({_id: req.params.id}).then((user) => {
       res.send(user);
     });
   }).catch(next);
};

// DELETAR USUARIO
//exports.delete = function (req, res) {
//  res.send({type: 'DELETE'});
//};

// o next serve só para não travar o programa
exports.delete = (req, res, next) => {
  User.findByIdAndRemove({_id: req.params.id}).then((user) =>{
    res.send(user);
  }).catch(next);
};

// SELECT * FROM
exports.listausuarios = (req, res) => {
   User.find({}).then((pi) => {
   res.send(pi);
   });
};

// SELECIONA USUARIO PELO ID
exports.selecionausuario = (req, res) => {
   User.find({_id: req.params.id}).then((user) => {
       res.send(user);
     });
   };

// Logar
exports.logar = (req, res) => {
User.find({email: req.body.email, senha: req.body.senha}).then((user) => {
        res.send(user);
      });
    };
