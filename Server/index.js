const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Establishing the Connection with database
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "root",
	database: "login",
});

app.post("/add", (req, res) => {
	const name = req.body.name;
	const email = req.body.email;

	//Checking if email entered by user is valid or not
	if (isEmail(email)) {
		db.query(
			"INSERT INTO user (name, email) VALUES (?,?)",
			[name, email],
			(err, result) => {
				if (!err) {
					res.send({ message: "Success" });
				}
			}
		);

		// console.log("Name is: " + name + "Email is: " + email);
	} else {
		res.send({ message: "Enter A Valid Email" });
	}
});

//Email Validation
function isEmail(email) {
	var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	if (email !== "" && email.match(emailFormat)) {
		return true;
	} else {
		return false;
	}
}

app.listen(3001, () => {
	console.log("Server is running at Port 3001");
});
