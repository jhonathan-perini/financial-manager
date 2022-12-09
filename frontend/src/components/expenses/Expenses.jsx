import Dialog from "../dialog/Dialog";
import {useEffect, useState} from "react";
import doll from '../../assets/expenses/voodoo-doll.svg'
import Select from 'react-select'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import api from "../../api/api.js";
import categoryImages from "../../assets/categoryEnum";
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import {all} from "axios";
registerLocale('pt-BR', pt)
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
        backgroundColor: 'rgba(0,0,0,0.78)',
        borderRadius: '10px'
    }),
    menuList: (provided, ) => ({
        ...provided,
        color: 'ghostwhite',
        borderRadius: '10px',

    }),
    option: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: "red"
        },


    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#FFF',

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

    const initialStateFilter = {
        name: '',
        value: '',
        category: null,
        date: '',

    }
    const [dialog, setDialog] = useState(false)
    const [expense, setExpense] = useState(initialState)
    const [filter, setFilter] = useState(initialStateFilter)
    const [filteredExpenses, setFilteresExpenses] = useState([])
    const categoryOptions = [{label:'food', value: 'food'}, {label:'clothes', value: 'clothes'}, {label:'restaurant', value: 'restaurant'}]
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

    function handleInput(e, date) {
        if(date === 'date'){
            setExpense((prevState) => ({...prevState, [date]: e}))
        } else {
            setExpense((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }

        console.log(e.toLocaleDateString())
    }

    function handleInputFilter(e, date) {
        if(date === 'date'){
            setFilter((prevState) => ({...prevState, [date]: e}))
        } else {
            setFilter((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }
        console.log(e.toLocaleDateString())
    }

    function handleSelect(e, name) {
        setExpense((prevState) => ({...prevState, [name]: e}))
        console.log(e, name)
    }

    function handleSelectFilter(e, name) {
        setFilter((prevState) => ({...prevState, [name]: e}))
        console.log(e, name)
    }

    function createExpense(){
        addExpense.mutate(expense)
        setDialog(false)
        setExpense(initialState)
    }

    function getCategoryImage(imageName){
        console.log(imageName)
        return <img className="expense-category__icon" src={`../../../src/assets/expenses/${categoryImages[imageName.toUpperCase()]}.svg`} alt={`${imageName} icon`} title={imageName}/>

    }
async function abc(){
        const a = await api.get('/expenses?category=food')
    return a.data.response
}
abc().then(res => console.log(res))
    return (
        <>
            {dialog && <div className="overlay"/>}
            <Dialog dialogState={{dialog, setDialog}} header={"Create expense"} confirmAction={createExpense} >
                <div className="dialog__container">
                    <img src={doll} alt="voodoo doll" className="dialog__image"/>
                <form className="expenses__form">
                    <div className="input-container">
                        <input type="text" maxLength={30} className="general-input form__input" value={expense.name} onChange={handleInput} placeholder="Name" name="name"/>
                    </div>
                    <div className="input-container">
                        <input type="string" className="general-input form__input" value={expense.value} onChange={handleInput} placeholder="Value" name="value"/>

                    </div>
                    <div className="input-container">
                        <Select options={categoryOptions} styles={dropdownStyle} placeholder="Category" name="category" value={expense.category} onChange={(e) => handleSelect(e,'category')} />

                    </div>
                    <div className="input-container">
                        <DatePicker selected={expense?.date} dateFormat="dd/MM/yyyy"  locale="pt-BR" className="general-input form__input" onChange={(date) => handleInput(date, 'date')} placeholderText="dd/mm/yyyy"  />



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


            <div className="filter__bar">
<h2>Filters</h2>
                <div className="filter__inputs">
                    <div className="input-container">
                        <Select options={categoryOptions} isMulti={true} styles={dropdownStyle} placeholder="Category" name="category" value={filter?.category} onChange={(e) => handleSelectFilter(e,'category')} />

                    </div>
                    <div className="input-container">

                        <DatePicker selected={filter?.date}  dateFormat="PP"  locale="pt-BR" className="general-input form__input" onChange={(date) => handleInputFilter(date, 'date')} placeholderText="dd/mm/yyyy"  />
                    </div>
                    <div className="input-container">
                        <input type="text" className="general-input form__input" value={filter?.name} onChange={handleInputFilter} placeholder="Name" name="name"/>
                    </div>
                    <div className="input-container">
                        <input type="string" className="general-input form__input" value={filter?.value} onChange={handleInputFilter} placeholder="Value" name="value"/>

                    </div>
                    <a>Clear</a>
                </div>

            </div>
            <div className="expenses__container">
                { allExpenses?.map(expense => {
                    return <div className="expense__card" key={expense._id}>
                        <div>      {expense?.name}</div>

                        <p >{new Date(expense?.date).toLocaleDateString('pt-BR')}</p>
                        <p >{Number(expense?.value).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>
                        {getCategoryImage(expense?.category)}
                    </div>



                })}
            </div>
        </section>
        </>
    )
}