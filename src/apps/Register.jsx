import React, { useState, useContext } from 'react';
import userContext from '../context/UserContext';
import { Link } from 'react-router-dom';

import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    const { setUser } = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://492ogn6a27.execute-api.us-east-2.amazonaws.com/r2/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                setSuccessMessage('You are registered as: ' + username); // Set success message
                setError(null); // Clear any previous errors
            } else {
                setError('Invalid login credentials');
                setSuccessMessage(null); // Clear success message
            }
        } catch (error) {
            console.error('Error making request:', error);
            setError('The username has been existed. Try another to register, or login.');
            setSuccessMessage(null); // Clear success message
        }
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <form onSubmit={handleSubmit}>
                <MDBInput
                    wrapperClass='mb-4'
                    label='User Name'
                    id='form1'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='form2'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                {error && <div style={{ color: 'red' }}>{error}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Display success message */}

                <MDBBtn type="submit" className="mb-4">Sign up</MDBBtn>
            </form>

            <div className="text-center">
                <p>Already registered? <Link to="/login">Login</Link></p>
            </div>
        </MDBContainer>
    );
}

export default Login;
