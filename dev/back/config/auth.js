const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Model de usuario
const User = require('../model/Usuario');
//require("../models/Usuario")
//const Usuario = mongoose.model("usuario")

module.exports = function(passport){

	passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
		
		User.findOne({email: email}).then((user) =>{
			if(!user){
				return done (null, false, {message: "Conta não existe"});
			}

			bcrypt.compare(senha, user.senha, (erro, hash) => {
				if(hash){
					return done(null, user);
				}else{
					return done(null, false, {message: "Senha incorreta"});
				}
			})
		})	
	}))

	passport.serializeUser((user, done) => {
		done(null, user._id)

	})

	passport.deserializeUser((id, done) => {

		User.findById(id, (err, user) => {
			done(err, user)
		});		
	});

};