import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const  Books = function () {

    const [books, setBooks] = useState([])

    useEffect(function(){
        const fetchAllBooks = async function () {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async function (id) {
        try {
            await axios.delete("http://localhost:8800/books/"+ id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>La librairie de Henry</h1>
            <div className="books">
                {books.map(function(book){
                    return <div key={book.id} className="book">
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <span>{book.price} XAF</span>
                        <p>{book.desc}</p>
                        <button className='delete-button' onClick={function(){
                            handleDelete(book.id)
                        }}>Supprimer</button>
                        <button className='update-button'><Link to={`/update/${book.id}`}>Mettre à jour</Link></button>
                    </div>
                })}
            </div>
            <button className='link-button'><Link to="/add">Ajouter un livre</Link></button>
        </div>
    )
}

export default Books