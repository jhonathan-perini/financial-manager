import mongoClient from "../db.js";

const collection=mongoClient.collection('expenses')

export async function getAllExpenses(req, res){

    const response = await  collection.find({}).toArray()

    res.status(201).send({
        response
    })

}