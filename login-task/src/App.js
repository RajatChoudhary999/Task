import { useState } from "react";
import Axios from "axios";
import "./App.css";

const App = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const register = (e) => {
		e.preventDefault();

		if (isEmail(email)) {
			Axios.post("http://localhost:3001/add", {
				name: name,
				email: email,
			}).then((response) => {
				console.log(response.data.message);

				alert(response.data.message);
			});
		} else {
			alert("Enter A valid Email");
		}

		//Email Check
		function isEmail(email) {
			var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
			if (email !== "" && email.match(emailFormat)) {
				return true;
			} else {
				return false;
			}
		}

		setName("");
		setEmail("");
	};

	return (
		<div className="app">
			<form onSubmit={register}>
				<h1>ADD USER</h1>
				<label>Name</label>
				<input
					name="username"
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					required
				/>
				<label>Email</label>
				<input
					name="email"
					type="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default App;
