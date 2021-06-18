
const knex = require("knex");
const express = require("express");
const data = require("./data.js");
const bodyParser = require('body-parser');
const cors = require("cors")
const sendMail = require("./mail.js")
const Pool = require("pg").Pool

const app = express();

const pool = new Pool({
	user: "georgemoore",
	password: "",
	host: "127.0.0.1",
	port: 5432,
	database: "caroline_moore_art"
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/gallery", (req, res) => {
	console.log("GET Request: ", "/gallery");
    res.setHeader("Content-Type", "application/json")
    pool.query("SELECT * FROM artwork")
    	.then((data) => {
    		res.send(data.rows)
    	})
    	.catch((error) => console.log(error))
})

app.get("/gallery:id", (req, res) => {
    id = parseInt(req.params.id.substring(1))
	console.log("GET Request: ", `/gallery:${id}`);
    res.setHeader("Content-Type", "application/json");
    pool.query("SELECT * FROM artwork WHERE id=$1", [id])
		.then((data) => {
			res.send(data.rows)
		})
		.catch((error) => console.log(error))
})

app.post("/contact", (req, res) => {
	console.log("POST Request");
	const { name, email, subject, message } = req.body
	sendMail(name, email, subject, message)
}) 

app.listen(5000, () => {
	console.log("listening on port 5000")
})
