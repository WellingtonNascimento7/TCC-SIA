module.exports = {
	admin: function(req, res, next){


		if(req.isAuthenticated() && req.user.perfil == 1){
			
			return next();
		}
		//console.log(req.user.perfil)
		req.flash("error_msg", "Necessario ser Adiministrador");
		//res.send(req.usuario);
		res.send({mensagem: "Necessario ser Adiministrador"})
	}
}