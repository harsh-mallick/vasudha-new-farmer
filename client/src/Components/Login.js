import React from 'react'
import '../Css/Login.css'
import keyimage from '../Images/key.png'
import atimage from '../Images/at.png'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Login = () => {
    const history  = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
        user_role: "Farmer"
    });

    let name, value;
    const handleInput = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    const postData = async (e) => {
        e.preventDefault();
        const { email, password, user_role} = user
        console.log(user)

        const res = await fetch("/farmer-signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password, user_role
            })
        });
        const data = res.json();
        if (res.status === 400 || res.status === 422 || !data) {
            window.alert("Invalid credentials");
        } else {
            window.localStorage.setItem("payload", "true")
            window.localStorage.setItem("homereload", "true")
            window.alert("Login Successful");
            history('/')
        }
    }
        return (
            <div className='body-login'>
                <div className="wapper-login">
                    <div className="form-login">
                        <h2 className='h2-login'>Login To Your Account</h2>
                        <form action="#">
                            <div className="input-box-login">
                                <label for="Email" onselectstart="return false" onmousedown="return false">Email</label>
                                <img src={atimage} alt="email" className='img-login' />
                                <br />
                                <input type="email" required className='input-login' name="email" value={user.email} onChange={handleInput} />
                            </div>
                            <div className="input-box-login">
                                <label for="Password">Password</label>
                                <img src={keyimage} alt="email" className='img-login' />
                                <br />
                                <input type="password" required className='input-login' name="password" value={user.password} onChange={handleInput} />
                            </div>
                            <div className="forgot-login">
                                <a href="#" className='a-login'>Forgot your password?</a>
                            </div>
                            <div className="buttion-login">
                                <button type="submit" className='button-login' onClick={postData}>Login</button>
                            </div>
                            <div className="register-login">
                                <a href="/signup" className='a-login'>Don't have a account? Make one!</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    export default Login
