import mongoClient from "../db.js";
import {ObjectId} from "mongodb";

const collection=mongoClient.collection('expenses')

export async function getAllExpenses(req, res){
    let params = req.query
    let newObjectQuery = []
    let minvalue = {};
    let maxvalue = {};

    if (params?.minValue && params?.maxValue){
        minvalue =  {value: {$gte: Number(`${params?.minValue}`)}}
        maxvalue = {value: {$lte: Number(`${params?.maxValue}`)}}
        newObjectQuery.push(minvalue, maxvalue)
    } else if (params?.minValue){
        minvalue =  {value: {$gte: Number(`${params?.minValue}`)}}
        newObjectQuery.push(minvalue)
    } else if (params?.maxValue) {
        maxvalue = {value: {$lte: Number(`${params?.maxValue}`)}}
        newObjectQuery.push(maxvalue)
    }
    if(params?.category){
        let cats = []
        params?.category.split(',').forEach(category => {
            cats.push({category})
        })
        newObjectQuery.push({$or: cats  })
    }

let finalQUery =  newObjectQuery.length > 0  ? newObjectQuery : [{}]



    console.log(finalQUery)
    console.log(params?.limit)
    let response;
    if(params?.limit){
         response = await  collection.find(
            {$and:
                finalQUery
            },
        ).limit(+params.limit).toArray()
    } else {
        response = await  collection.find(
            {$and:
                finalQUery
            },
        ).toArray()
    }

console.log(response)
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
    expense.type = expense.type.label
    console.log(expense.type)
    expense.type === 'income' ? expense.category = 'income' : expense.category = expense.category.label
    expense.value = +expense.value
    expense.date = new Date(expense.date).toLocaleDateString('pt-BR')
    console.log(expense)
    await collection.insertOne(expense)

    res.status(201).send({
        message: 'Your expense was created.'
    })
}

export async function deleteExpense(req, res){

    const id = req.params.id
console.log(id)
    await collection.deleteOne({_id: new ObjectId(id)})

    res.status(204).send({
        message: 'Your expense was deleted.'
    })
}

export async function getSumExpenses(req, res){

    const response = await collection.aggregate([{
        $group: {

            _id: "$category",
            totalAmount: { $sum: "$value" },
            count: { $sum: 1 }

        }},{
        $sort: {
            _id: 1
        }
    }
    ]).toArray()
console.log(response)
    res.status(200).send({
        message: 'Success.',
        data: response
    })
}



