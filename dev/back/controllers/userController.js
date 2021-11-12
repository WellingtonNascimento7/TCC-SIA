const User = require('../model/Usuario');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.test = function (req, res) {
  res.send('Olá! Teste ao Controller');
};

// TODO: listar pontos de interesse da BD
exports.details = function (req, res) {
  res.send({type: 'GET'});
};

// ADICIONAR USUARIO

exports.create = (req, res) => { 
  bcrypt.hash(req.body.senha, 12, (errBcrypt, hash) => {
    if(errBcrypt) {
      return res.status(500).send({error: errBcript});
    }
    var vperfil = 1;
    if(req.body.perfil != 1){
      vperfil = 0;
    }
    User.create({nome: req.body.nome, nascimento: req.body.nascimento, telefone: req.body.telefone, email: req.body.email, senha: hash, perfil: vperfil}).then((user) => {
      res.send(user);
    }); 
  });   
};


//Atualiza Usuario
exports.update = (req, res, next) => {
  bcrypt.hash(req.body.senha, 12, (errBcrypt, hash) => {
    if(errBcrypt) {
      return res.status(500).send({error: errBcript});
    }
    User.findByIdAndUpdate({_id: req.params.id}, {nome: req.body.nome, nascimento: req.body.nascimento, telefone: req.body.telefone, 
                            email: req.body.email, senha: hash, perfil: req.body.perfil}).then(() =>{ //o findOne seleciona o que usuario q foi atualizado
    User.findOne({_id: req.params.id}).then((user) => {
      res.send(user);
    });
   }).catch(next);
  });    
};



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
/*exports.logar = (req, res) => {  
  User.findOne({email: req.body.email}).then((user) => {
    bcrypt.compare(req.body.senha, user.senha, (err, result) =>{
      if(result){
        res.send(user);
      }
      if(err){
        res.send(err);
      }
    }).then();   
  });
};*/

exports.logar = (req, res, next) => {  
  passport.authenticate("local", {failureFlash: true}, (err, user) => {
    req.logIn(user, (err) => {
      if(err){console.log(err)}
        res.send(user)
    })
     // res.send(user)
  })(req, res, next);
};

exports.logout = (req, res, next)=> {
  req.logout();
  res.send({Situacao: "usuario deslogado com sucesso"})
};