import React, { useState } from "react";
// import { auth } from "../utils/firebaseConfig";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBContainer
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();
    const toast = useToast();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                toast({
                    title: 'Login Successful',
                    position: 'top-right',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError({ errorMessage, errorCode });
                toast({
                    title: errorMessage,
                    position: 'top-right',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                // ..
            });
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    return (
        <div>
            <h1>Login</h1>
            <MDBContainer className='d-flex justify-content-center'>
                <MDBCard className='p-5 w-10'>
                    <MDBCardBody>
                        <form onSubmit={handleLogin}>
                            <MDBInput className='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='form1Example1' label='Email address' />
                            <MDBInput className='mb-4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='form1Example2' label='Password' />

                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                    {/* <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked /> */}
                                    <Link to="/register">New user? Register here</Link>
                                </MDBCol>
                                <MDBCol>
                                    <Link to="/forgot-password">Forgot Password</Link>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type='submit' block>
                                Login
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                    {/* {error && <p>{error.message}</p>} */}
                </MDBCard>
            </MDBContainer>



            {/* <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form> */}
        </div>
    );
};

export default Login;
