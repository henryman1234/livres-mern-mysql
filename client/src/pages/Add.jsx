 import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const  Add = function () {

    const navigate = useNavigate()

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""

    })

    const handleChange = function (e) {
        setBook(function(prevState){
            return {...book, [e.target.name]: e.target.value}
        })
    }

    const handleClick = async function (e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className='form'>
            <h1>Ajouter</h1>
            <input type="text" name="title" placeholder="le nom" onChange={handleChange} />
            <input type="text" name="desc" placeholder="la description" onChange={handleChange} />
            <input type="number" name="price" placeholder="le prix" onChange={handleChange} />
            <input type="text" name="cover" placeholder="la cover" onChange={handleChange} />
            <button className='formButton' onClick={handleClick}>Ajouter</button>
        </form>
    )
}

export default Add