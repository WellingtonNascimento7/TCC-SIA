const express = require("express");
const app = express();

var ifs = require('os').networkInterfaces();

var IPwifi = Object.keys(ifs)
    .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
    .filter(x => x)[1].address;

var portaAPI = '8081';

var enderecoAPI = "http://"+IPwifi+":"+portaAPI;

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/cadastro/", (req, res) => {
    res.render("cadastro");
})

app.get("/principal/", (req, res) => {
    res.render("principal", { endereco: enderecoAPI });
})

app.get("/cadastroEstabelecimento/", (req, res) => {
    res.render("cadastroEstabelecimento", { endereco: enderecoAPI });
})

app.listen(8090,() => {
    console.log("App rodando!");
    console.log(ifs);
    console.log(portaAPI);
    console.log(IPwifi);

    // var ip = require("ip");
    // console.log(ip.address()) // my ip address
    
    // console.log(ip) // 192.168.1.128) // 192.168.1.255
});

