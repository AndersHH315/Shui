import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    async function loginUser(e) {
        e.preventDefault();
        const existingUser = {
            username: input.username,
            password: input.password
        };
            axios.post('http://localhost:3001/api/login', existingUser);
            if(!existingUser) {
                navigate('/login');
            }
            else {
                navigate('/');
            }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input onChange={handleChange} value={input.username} name="username" type="text" placeholder="Username" autoComplete="off" />
                <br />
                <input onChange={handleChange} value={input.password} name="password" type="password" placeholder="Password" autoComplete="off" />
                <br />
                <input type="submit" value="Login" />
                <br />
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
};

export default Login;