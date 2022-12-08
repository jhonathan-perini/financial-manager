import express from "express"
const app = express()

app.get("/",function(req,res){
    res.send("Essa é a pág de welcome")
})

app.get("/login",function(req,res){
    res.send("Essa é a pág de login")
})

app.get("/register",function(req,res){
    res.send("Essa é a pág de registro")
})

app.get("/menu",function(req,res){
    res.send("Essa é o menu")
})

app.get("/usermenu",function(req,res){
    res.send("Essa é o menu do usuário")
})

app.listen(2001, function(req,res){
    console.log("Rodando")
})