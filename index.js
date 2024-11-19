// Import express
const express = require('express');
const app = express();
const port = process.env.PORT || 6702; // PORT NUMBER


const moment = require('moment');

// Import mysql

const mysql = require('mysql');
const cors = require('cors');



// Logger middleware
const logger = (req, res, next) => {

    console.log(`${req.protocol}://${req.get('host')}${req.originalURL} : ${moment().format()}`);

    next();

};



// Use middlewares

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const connection = mysql.createConnection({

    host: "bifipqnv4vwy2uw95mnj-mysql.services.clever-cloud.com",

    user: "uwxpxvbavc5trgcn",

    password: "BHi8UB6nbWDMYseV2JYF",

    database: "bifipqnv4vwy2uw95mnj"

});



// Initialize the connection

connection.connect((err) => {

    if (err) throw err;

    console.log('Connected to MySQL');

});



// GET all members

app.get("/api/members", (req, res) => {

    connection.query("SELECT * FROM userdata", (err, rows, fields) => {

        if (err) throw err;

        res.json(rows);

    });

});



// GET a member by ID

app.get("/api/members/:id", (req, res) => {

    const id = req.params.id;

    connection.query("SELECT * FROM userdata WHERE id = ?", [id], (err, rows) => {

        if (err) throw err;

        if (rows.length > 0) {

            res.json(rows);

        } else {

            res.status(400).json({ msg: `${id} ID not found` });

        }

    });

});



// POST a new member

app.post("/api/members", (req, res) => {

    const { fname, lname, email, gender } = req.body;

    connection.query("INSERT INTO userdata (first_name, last_name, email, gender) VALUES (?, ?, ?, ?)",

        [fname, lname, email, gender], (err, rows, fields) => {

            if (err) throw err;

            res.json({ msg: `Successfully inserted` });

        });

});



// PUT - Update a member

app.put("/api/members", (req, res) => {

    const { fname, lname, email, gender, id } = req.body;

    connection.query(

        "UPDATE userdata SET first_name = ?, last_name = ?, email = ?, gender = ? WHERE id = ?",

        [fname, lname, email, gender, id],

        (err, rows, fields) => {

            if (err) throw err;

            res.json({ msg: `Successfully updated` });

        }

    );

});



// DELETE a member

app.delete("/api/members", (req, res) => {

    const id = req.body.id;

    connection.query("DELETE FROM userdata WHERE id = ?", [id], (err, rows, fields) => {

        if (err) throw err;

        res.json({ msg: `Successfully deleted` });

    });

});



// Start the server

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});
