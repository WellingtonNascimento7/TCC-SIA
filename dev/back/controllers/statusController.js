const Estab = require('../model/Estabelecimento');
const User = require('../model/Usuario');
const Status = require('../model/StatusMovimento');
var mongoose = require('mongoose');
const Enum = require('enum');
var enumSitMovimento = new Enum({
    1: 'Fechado',
    2: 'Vazio',
    3: 'Baixo',
    4: 'Médio',
    5: 'Cheio',
    6: 'Lotado',
    99: 'Indefinido'});

//const Endereco = require('./enderecoController');
//const Endereco = require('../model/EnderecoEstab');

// ADICIONAR STATUS
exports.create = (req, res) => { 
  Status.create({estabelecimento: req.body.estabelecimento, usuario: req.body.usuario, status: req.body.status,
   datainsercao: Date.now()}).then((status) => { 
  res.send(status);
  });
};

 //ATUALIZA STATUS (Acho que não sera utilizado mais esta feito para carater de testes e afins)
exports.update = (req, res, next) => {
   Status.findOneAndUpdate({_id: req.params.id}, {estabelecimento: req.body.estabelecimento, 
    usuario: req.body.usuario, status: req.body.status}).then(() =>{      
     Status.findOne({_id: req.params.id}).populate('estabelecimento').populate('usuario').then((status) => {
       res.send(status);
     });   
   }).catch(next);
};

// DELETAR STATUS (idem ao atualizar)
exports.delete = (req, res, next) => {    
  Status.findOneAndDelete({_id: req.params.id}).then((status) =>{
    res.send(status);    
  }).catch(next);
};

// SELECT * FROM
exports.listastatus = (req, res) => {
  Status.find({}).populate('estabelecimento').populate('usuario').then((status) =>{
  res.send(status);})
};

//SELECIONA UM STATUS
exports.status = (req, res) => {
   Status.findOne({_id: req.params.id}).populate('estabelecimento').populate('usuario').then((status) => {
   res.send(status);});
};

//RETORNA O STATUS DE DETERMINADO ESTABELECIMENTO (não terminado)
exports.statusestab = async (req, res) => {
   //Comando retirado da documentação mais não roda
   //Status.aggregate.group({ _id: "$estabelecimento" }).then((status) => {
    
   var data1 = new Date(Date.now());
   var pegar;
   const estab = await Estab.findOne({_id: req.params.estab})//.then((estab) => {
      var abertura = new Date(Date.now());
      var fechamento = new Date(Date.now());
      const separators = /[\s,\.;:\(\)\-'\+]/g;
      const func = estab.horariofunc.split(separators)
      abertura.setHours(func[0], func[1], 0);
      fechamento.setHours(func[4], func[5], 0);
      if(data1 < abertura || data1 > fechamento ){
        pegar = 1;
      }

    if(pegar == 1){
      res.send({status: String(pegar) === 'undefined' ? enumSitMovimento.get(String(99)).value : enumSitMovimento.get(String(pegar)).value  });
    }else{
      
      var data2 = new Date(Date.now());
      data2.setHours(data1.getHours()-4);
      var id = mongoose.Types.ObjectId(req.params.estab);
      const status = await Status.aggregate([
       {
        $match: {estabelecimento: id,
                datainsercao: {$gte: data2, $lte: data1}}
       },
       {
        $group: {
          _id: '$status',                
          contador: {$sum: 1}
        }
       }
        ])

       pegar = getStatus(status);
    
    console.log(pegar + "ultimo");
    res.send({status: String(pegar) === 'undefined' ? enumSitMovimento.get(String(99)).value : enumSitMovimento.get(String(pegar)).value  });
    }
      
};


function getStatus(status) {
  var cont = 0, cont2;

  for(let i in status){
    if(status[i].contador >= cont){
      cont = status[i].contador;
      cont2 = status[i]._id;
    }
  } 
  return cont2;
}

//Historico 