import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const  Update = function () {

    const navigate = useNavigate()
    const location = useLocation()
    
    const bookId = location.pathname.split("/")[2]

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

    const handleUpdate = async function (e) {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/books/"+ bookId, book)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className='form'>
            <h1>Mettre à jour</h1>
            <input type="text" name="title" placeholder="le nom" onChange={handleChange} />
            <input type="text" name="desc" placeholder="la description" onChange={handleChange} />
            <input type="number" name="price" placeholder="le prix" onChange={handleChange} />
            <input type="text" name="cover" placeholder="la cover" onChange={handleChange} />
            <button className='formButton' onClick={handleUpdate}>Mettre à jour</button>
        </form>
    )
}

export default Update