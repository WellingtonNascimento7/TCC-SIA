const Estab = require('../model/Estabelecimento');
//const Endereco = require('./enderecoController');
const Endereco = require('../model/EnderecoEstab');
const Tags = require('../model/TagsEstab');

//teste - A rota PROXIMO ja esta trazendo tudo
exports.distancia = (req, res, next) => { 
  var distancia = (getDistanceFromLatLonInMetros(
   {lat: req.body.lat1, lng: req.body.lng1},
   {lat: req.body.lat2, lng: req.body.lng2}
    ))
    res.send({Distancia :distancia});
};

exports.proximo = (req, res, next) =>{
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    const maxDist = 10000;
    Endereco.aggregate([{
        $geoNear: {
        near: { 'type': 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)] },
        spherical: true,
        distanceField: 'distancia',        
        maxDistance: maxDist
      },

     },{$limit: 10}]).then((ende) => {
        Estab.populate(ende, {path: 'estabelecimento'}).then((estab) =>{
            res.send(estab);
        });
     }).catch(next);
};

function getDistanceFromLatLonInMetros(origem, destino) {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(destino.lat - origem.lat),
        dLng = deg2rad(destino.lng - origem.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(origem.lat))
            * Math.cos(deg2rad(origem.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var res = ((R * c *1000).toFixed());
        if(res>= 1000){
        	return (res/1000);
        }else{
        	return res;
        }
}

//AIzaSyA6I_vZPulkKSmLUL4_xvMqQFOxGUymZpU



