import { useState } from 'react';
import axios from 'axios';

function Stream() {
    const [input, setInput] = useState({
        description: '',
        title: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setInput(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        });
    }

    async function addStream(e) {
        e.preventDefault();
        const newStream = {
            description: input.description,
            title: input.title
        };
        axios.post('http://localhost:3001/api/streams', newStream);
    }

    return(
        <div>
            <h1>Streams</h1>
            <form onSubmit={addStream}>
                <input onChange={handleChange} value={input.description} name="description" type="text" placeholder="Description" autoComplete="off" />
                <br />
                <input onChange={handleChange} value={input.title} name="title" type="text" placeholder="Title" autoComplete="off" />
                <br />
                <input type="submit" value="Add Stream" />
            </form>
        </div>
    )

};

export default Stream;