const Estab = require('../model/Estabelecimento');
const User = require('../model/Usuario');
const Status = require('../model/StatusMovimento');
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

    //AINDA TA RUIM MAIS TA FUNCIONANDO
    const status = await Status.aggregate([
     /*{
      $match: {estabelecimento: req.params.estab}
     },*/
     {
      $group: {
        _id: '$estabelecimento',
        media: {$avg: '$status'},
        contador: {$sum: 1}
      }
     }
      ])
    
   res.send(status);};
//};

