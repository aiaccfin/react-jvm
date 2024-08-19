import React, { useContext, useState } from 'react'
import userContext from '../context/UserContext'
import { Link } from 'react-router-dom';

import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';

function Login() {

    const [username, setuserName] = useState('')
    const [passward, setPassward] = useState('')
    const [number, setNumber] = useState('')

    const { setUser } = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username', username);
        localStorage.setItem('passward', passward);
        localStorage.setItem('number', number);
        setUser({ username, passward, number });
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4">Sign in</MDBBtn>

            <div className="text-center">

                <p>Not a member? <Link to="/register">Register</Link></p>
            </div>
        </MDBContainer>
    );
}

export default Login;
