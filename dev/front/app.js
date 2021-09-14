const express = require("express");
const app = express();

app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/cadastro/", (req, res) => {
    res.render("cadastro");
})

app.get("/principal/", (req, res) => {
    res.send("<h1>USUÁRIO LOGADO!</h1><h3>Aqui será a tela principal</h3><a href='/'>voltar</a>");
})

app.listen(8090,() => {
    console.log("App rodando!");
});