import express from "express"
import cors from "cors"
import mysql from "mysql"
const port = 8800

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Murielle12345?!",
    database: "store"
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))

app.get("/", function(req, res){
    res.json("hello from the backend")
})

app.get("/books", function(req, res){
    const q = "SELECT * FROM books"
    db.query(q, function(err, data){
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", function(req, res){
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES(?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], function(err, data){
        if (err) return res.json(err)
        return res.json("The has been created successfully")
    })
})

app.delete("/books/:id", function(req, res){
    const q = "DELETE FROM books WHERE id = ?"
    const bookId = req.params.id
    db.query(q, [bookId], function(err, data){
        if (err) return res.json(err)
        return res.json("The Book has been deleted successfully")
    })
})

app.put("/books/:id", function(req, res){
    const q = "UPDATE books SET `title` = ? , `desc` = ?,  `price` = ?,  `cover` = ? WHERE id = ?"
    const bookId = req.params.id

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], function(err, data){
        if (err) return res.json(err)
        return res.json("The book has been updated successfully")
    })
})

app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
})
