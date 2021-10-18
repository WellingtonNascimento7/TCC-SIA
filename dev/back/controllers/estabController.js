const Estab = require('../model/Estabelecimento');
//const Endereco = require('./enderecoController');
const Endereco = require('../model/EnderecoEstab');
const Tags = require('../model/TagsEstab');
exports.test = function (req, res) {
  res.send('Olá! Teste ao Controller');
};

// ADICIONAR ESTABELECIMENTO
exports.create = (req, res) => { 
  Estab.create({nome: req.body.nome, horariofunc: req.body.horariofunc}).then((estab) => {
    Endereco.create({cep: req.body.cep, logradouro: req.body.logradouro, numero: req.body.numero, bairro: req.body.bairro,
    estado: req.body.estado, cidade: req.body.cidade, complemento: req.body.complemento, estabelecimento: estab._id }).then((endereco) =>{
      Endereco.findOne({_id: endereco._id}).populate('estabelecimento').then((ender) => {
        Tags.create({enderecoEstab: ender._id, tags: generateTags(ender)}).then(() =>{
          res.send(endereco);
        })
      });
    });  
  });
};

 //ATUALIZA ESTABELECIMENTO
exports.update = (req, res, next) => {
   Estab.findOneAndUpdate({_id: req.params.id}, {nome: req.body.nome, horariofunc: req.body.horariofunc}).then(() =>{
    Endereco.findOneAndUpdate({estabelecimento: req.params.id},
                    {cep: req.body.cep, logradouro: req.body.logradouro, numero: req.body.numero, 
                      estado: req.body.estado, cidade: req.body.cidade, complemento: req.body.complemento}).then(() =>{ //o findOne seleciona o que usuario q foi atualizado
      
      Endereco.findOne({estabelecimento: req.params.id}).populate('estabelecimento').then((endereco) => {
        Tags.findOneAndUpdate({enderecoEstab: endereco._id, tags: generateTags(endereco)}).then(() =>{
          res.send(endereco);
        });       
      });
   })
   
   }).catch(next);
};

// DELETAR ESTABELECIMENTO
exports.delete = (req, res, next) => {  
  Endereco.findOneAndDelete({estabelecimento: req.params.id}).populate('estabelecimento').then((endereco) =>{
    Estab.findOneAndDelete({_id: req.params.id}).then(() =>{
      Tags.findOneAndDelete({enderecoEstab: endereco._id}).then(() =>{
        res.send(endereco);
      });      
    });    
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
    //descomente o trecho de codigo abaixo para criar as tags dos estabelecimentos cadastrados anteriormente
    /*Tags.create({enderecoEstab: pi._id, tags: generateTags(pi)}).then(() =>{     
          }).catch(function(e) {
    console.log(e);
  });*/
   res.send(pi);});
};

exports.pesquisa = (req, res) => {
  const busca = simplifica(req.params.busca);
  Tags.find({tags: {$all: busca }}).then((pi) => {
    var estab = [];
    for (var i = 0; i < pi.length; i++) { 
       estab.push(pi[i].enderecoEstab);
        console.log((pi[i].enderecoEstab));
      };    
    Endereco.find({_id: {$in: estab}}).populate('estabelecimento').then((endereco) => {     
      res.send(endereco);
    }).catch(function(e) {
        console.log(e);
    });
  });
};

// SELECIONA ESTABELECIMENTO PELO ID
/*exports.selecionausuario = (req, res) => {
   User.find({_id: req.params.id}).then((user) => {
       res.send(user);
     });
   };*/


//PESQUISA

function simplifica(text){
    const separators = /[\s,\.;:\(\)\-'\+]/g; //regex para remover caracteres
    const diacritics = /[\u0300-\u036f]/g; //

    //capitalização e normalização
    text = text.toUpperCase().normalize("NFD").replace(diacritics, "");
    //separando e removendo repetidos
    const arr = text.split(separators).filter((item, pos, self) => self.indexOf(item) == pos);
    if(arr.length > 1){ //Cria uma string juntando o array caso ele tenha mais de duas palavras
      arr.push(arr.join(''));
    }
    //console.log(arr);
    //removendo nulls, undefineds e strings vazias
    return arr.filter(item => (item));
}

function generateTags(estab){
    let tags = [];
    tags.push(...simplifica(estab.estabelecimento.nome));
   // tags.push(estab.year.toString());
    tags.push(...simplifica(estab.logradouro));
    tags.push(...simplifica(estab.estado));
    tags.push(...simplifica(estab.cidade));
    tags.push(...simplifica(estab.bairro))
    tags.push(estab.cep.toString());
    //console.log(tags);

    return tags;
}




