import app from "../app.js";
import {Router} from "express";
import {createExpense, deleteExpense, getAllExpenses, getSumExpenses, updateExpense} from "./expenses.controller.js";

//ROTAS CRUD

const expensesRouter = Router()

expensesRouter.route('/expenses').get(getAllExpenses).post(createExpense)
expensesRouter.route('/expenses/:id').patch(updateExpense).delete(deleteExpense)
expensesRouter.route('/expenses/category').get(getSumExpenses)



// app.get("/",function(req,res){
//     res.send("Essa é a pág de welcome")
// })
//
// app.get("/login",function(req,res){
//     res.send("Essa é a pág de login")
// })
//
// app.get("/register",function(req,res){
//     res.send("Essa é a pág de registro")
// })
//
// app.get("/menu",function(req,res){
//     res.send("Essa é o menu")
// })
//
// app.get("/usermenu",function(req,res){
//     res.send("Essa é o menu do usuário")
// })

// app.listen(2001, function(req,res){
//     console.log("Rodando")
// })


export default expensesRouter