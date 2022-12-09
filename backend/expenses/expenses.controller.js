import mongoClient from "../db.js";
import {ObjectId} from "mongodb";

const collection=mongoClient.collection('expenses')

export async function getAllExpenses(req, res){
    const params = req.query
    console.log(params)
    const response = await  collection.find({}).toArray()

    res.status(201).send({
        response
    })

}

export async function updateExpense(req, res){

    const {expense} = req.body
    const id = req.params.id

    await collection.updateOne({_id: new ObjectId(id)}, {$set: {expense}})

    res.status(200).send({
        message: 'Your expense was updated.'
    })
}

export async function createExpense(req, res){

    const expense = req.body
    expense.category = expense.category.label
    console.log(expense)
    await collection.insertOne(expense)

    res.status(201).send({
        message: 'Your expense was created.'
    })
}

export async function deleteExpense(req, res){

    const id = req.params.id

    await collection.deleteOne({_id: new ObjectId(id)})

    res.status(204).send({
        message: 'Your expense was deleted.'
    })
}