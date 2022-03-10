import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setInput(prevInput =>{
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    async function registerUser(e) {
        e.preventDefault();
        const newUser = {
            username: input.username,
            email: input.email,
            password: input.password
        };
        axios.post('http://localhost:3001/api/register', newUser);
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input onChange={handleChange} value={input.username} name="username" type="text" placeholder="Username" autoComplete="off"/>
                <br />
                <input onChange={handleChange} value={input.email} name="email" type="text" placeholder="Email" autoComplete="off" />
                <br />
                <input onChange={handleChange} value={input.password} name="password" type="password" placeholder="Password" autoComplete="off" />
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
};

export default Register;