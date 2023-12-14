import React from 'react'
import "../Css/Style.css"
import userImage from "../Images/user.png"
import telephone from "../Images/telephone.png"
import at from "../Images/at.png"
import verified from "../Images/verified.png"
import keys from "../Images/key.png"
import home from "../Images/home.png"
import { useState } from 'react'

const Signup = () => {
    const dropvalue = ["Farmer", "Buyer", "Transporter"]
    const [myValue, setMyValue] = useState();
    const [user, setUser] = useState({
        name_farmer: "",
        aadharnumber: "",
        locality: "",
        state: "",
        address: "",
        phonenumber: "",
        email: "",
        password: "",
        role: "",
        pincode: "",
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
        const { name_farmer, aadharnumber, locality, state, address, phonenumber, email, password, role, pincode } = user
        console.log(user)

        const res = await fetch("/farmer-signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name_farmer, aadharnumber, locality, state, address, phonenumber, email, password, role, pincode
            })
        });
        const data = await res.json();
        console.log(data)
        console.log(res.status)
        if (res.status === 422 || res.status === 404 || !data) {

            window.alert("Invalid Registration")
            console.log("Invalid Registration")

        } else if (res.status === 500) {
            window.alert("Internal Server Error")
            console.log("Internal Server Error")
        } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            window.location.reload();
        };
    }
    return (
        <div className='body'>
            <div className="wrapper-signup">
                <div className="form-signup-signup">
                    <h2 className="signup-signup">Create an Account</h2>
                    <form action="#">
                        <div className="inform">
                            <div className="rightpanel-signup">
                                <div className="input-box-signup">
                                    <label htmlFor="Name" className='label-signup'>Name</label>
                                    <br />
                                    <img src={userImage} alt="Name" className="icons-signup" />
                                    <input className="input-signup" type="text" required placeholder="Enter your Name" onChange={handleInput} name="name_farmer" value={user.name_farmer} />
                                </div>
                                <div className="input-box-signup">
                                    <label className='label-signup' htmlFor="Mobile Number">Mobile Number</label>
                                    <br />
                                    <img src={telephone} alt="Name" className="icons-signup" />
                                    <input type="text" className='input-signup' required placeholder="Enter your Mobile Number" onChange={handleInput} name="phonenumber" value={user.phonenumber} />
                                </div>
                                <div className="input-box-signup">
                                    <label htmlFor="Address" className='label-signup'>Locality</label>
                                    <br />
                                    <img src={home} alt="Name" className="icons-signup" />
                                    <input type="text" className='input-signup' required placeholder="Enter your Locality" onChange={handleInput} name="locality" value={user.locality} />
                                </div>
                                <div className="input-box-signup">
                                    <label htmlFor="Email" className='label-signup'>Email</label>
                                    <br />
                                    <img src={at} alt="Name" className="icons-signup" />
                                    <input type="email" className='input-signup' required placeholder="Enter your Email ID" onChange={handleInput} name="email" value={user.email} />
                                </div>
                                <div className="input-box-signup">
                                    <label className="label-signup" htmlFor="Pincode">Enter your Pincode</label>
                                    <br />
                                    <img src={keys} alt="Name" className="icons-signup" />
                                    <input type="password" required placeholder="Enter your Pincode" className='input-signup' onChange={handleInput} name="pincode" value={user.pincode} />
                                </div>
                            </div>
                            <div className="leftpanel-signup">
                                <div className="input-box-signup">
                                    <label className="label-signup" htmlFor="Adhaar">Adhaar Number</label>
                                    <br />
                                    <img src={verified} alt="Name" className="icons-signup" />
                                    <input type="text" required placeholder="Enter your Adhaar Number" className='input-signup' onChange={handleInput} name="aadharnumber" value={user.aadharnumber} />
                                </div>
                                <div className="input-box-signup">
                                    <label htmlFor="Address" className='label-signup'>Address</label>
                                    <br />
                                    <img src={home} alt="Name" className="icons-signup" />
                                    <input type="text" className='input-signup' required placeholder="Enter your Address" onChange={handleInput} name="address" value={user.address} />
                                </div>
                                <div className="input-box-signup">
                                    <label htmlFor="Address" className='label-signup'>State</label>
                                    <br />
                                    <img src={home} alt="Name" className="icons-signup" />
                                    <input type="text" className='input-signup' required placeholder="Enter your State" onChange={handleInput} name="state" value={user.state} />
                                </div>
                                <div className="input-box-signup">
                                    <label className="label-signup" htmlFor="Password">Create a Password</label>
                                    <br />
                                    <img src={keys} alt="Name" className="icons-signup" />
                                    <input type="password" required placeholder="Create a new Password" className='input-signup' onChange={handleInput} name="password" value={user.password} />
                                </div>
                                <div className="input-box-signup, dropdown-signup">
                                    <label htmlFor="Role">Enter Your Profession: </label>
                                    <select className="select-signup" onChange={handleInput} name="role" value={user.role}>
                                        Define your Role
                                        {dropvalue.map((dropvalues, idx) => (
                                            <option className="option-signup" key={idx}>{dropvalues}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        </div>


                        <button type="submit" className="button-signup" onClick={postData}>Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
