import Dialog from "../dialog/Dialog";
import {useState} from "react";
import doll from '../../assets/expenses/voodoo-doll.svg'
import Select from 'react-select'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../api/api.js";


const dropdownStyle = {
    control: (provided, ) => ({
        ...provided,
      backgroundColor: '#898989',
        width: '100%',
       borderColor: "#898989",
        boxShadow: 'none',
    borderRadius: '8px',
        height: '40px',
        caretColor: 'red'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(248,248,255,0.70)',
        fontFamily: 'Hallowen inline',
        paddingLeft: '10px'
    }),
    container: (provided) => ({
        ...provided,
        width: '100%',
        height: '40px'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(0,0,0,0.6)',

    }),
    menuList: (provided) => ({
        ...provided,
        color: 'ghostwhite',

    }),
    option: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(255,255,255,0.23)',
        borderRadius: '8px',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#FFF'
    }),

}

export default function Expenses (){
    const initialState = {
        name: '',
        value: '',
        category: null,
        date: '',
        description: ''
    }
    const [dialog, setDialog] = useState(false)
    const [expense, setExpense] = useState(initialState)
    const categoryOptions = [{label:'food', value: 'food'}]
    const client = useQueryClient()
    const addExpense = useMutation( async (expense) => {
        return await api.post('/expenses', expense)
    }, {
        onSuccess: async () => {
            await client.invalidateQueries(["expenses"])
        }
    })

    const {data: allExpenses} = useQuery(["expenses"], async () => {
        const response = await api.get("/expenses")
        return  response.data.response
    })




    function handleDialog(){
        setDialog(!dialog)
    }

    function handleInput(e) {
        setExpense((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        console.log(expense)
    }

    function handleSelect(e, name) {
        setExpense((prevState) => ({...prevState, [name]: e}))
        console.log(e, name)
    }

    function createExpense(){
        addExpense.mutate(expense)
        setDialog(false)
        setExpense(initialState)
    }
    return (
        <>
            {dialog && <div className="overlay"/>}
            <Dialog dialogState={{dialog, setDialog}} header={"Create expense"} confirmAction={createExpense} >
                <div className="dialog__container">
                    <img src={doll} alt="voodoo doll" className="dialog__image"/>
                <form className="expenses__form">
                    <div className="input-container">
                        <input type="text" className="general-input form__input" value={expense.name} onChange={handleInput} placeholder="Name" name="name"/>
                    </div>
                    <div className="input-container">
                        <input type="string" className="general-input form__input" value={expense.value} onChange={handleInput} placeholder="Value" name="value"/>

                    </div>
                    <div className="input-container">
                        <Select options={categoryOptions} styles={dropdownStyle} placeholder="Category" name="category" value={expense.category} onChange={(e) => handleSelect(e,'category')} />

                    </div>
                    <div className="input-container">
                        <input type="date" pattern="\d{2}-\d{2}-\d{4}" className="general-input form__input" value={expense.date} onChange={handleInput} placeholder="Date" name="date"/>

                    </div>
                    <div className="input-container">
                        <input type="text" className="general-input form__input" value={expense.description} onChange={handleInput} placeholder="Aditional information" name="description"/>

                    </div>
                </form>

                </div>
            </Dialog>
        <section className="expenses__view">
            <div className="expenses__view--header">
                <h1>Hello! Wanna keep track of something? </h1>
                <a className="login__button" onClick={handleDialog}>Keep track</a>
            </div>
            <div className="expenses__container">
                {allExpenses?.map(expense => {
                    return <p key={expense._id}>{expense?.name}</p>
                })}
            </div>
        </section>
        </>
    )
}