import React, { useEffect, useState } from 'react';
import userpng from '../Components/user.png';
import { useNavigate } from 'react-router-dom';
import '../Css/Profile.css'

export default function Contactus() {
    const history = useNavigate()
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/getFarmerdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            const data = await res.json();
            console.log(data)
            setUserData(data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (error) {
            history('/seller-login')
            console.log(error)
        }
    }

    useEffect(() => {
        callAboutPage();
    });

    return (
        <section>
            <div className="sections">
            <div className="conntainers">
                <img src={userpng} alt="" className='userpng'/><br/>
                <div className="name"><i className="fas fa-solid fa-user">&nbsp;&nbsp;&nbsp;</i><b>Name: </b> {userData.name_farmer}</div>
                <hr className='hrtag'/><br/>
                <div className="email"><i className="fas fa-solid fa-envelope"></i>&nbsp;&nbsp;&nbsp;<b>Email: </b>{userData.email}</div>
                <hr className='hrtag'/><br/>
                <div className="email"><i className="fas fa-solid fa-envelope"></i>&nbsp;&nbsp;&nbsp;<b>Aadhar Number: </b>{userData.aadharnumber}</div>
                <hr className='hrtag'/><br/>
                <div className="address">&#128205;&nbsp;&nbsp;<b>Address: </b>{userData.address},&nbsp;{userData.locality},&nbsp;{userData.state},&nbsp;{userData.pincode}</div>
                <hr className='hrtag'/><br/>
                <div className="email"><i className="fas fa-solid fa-phone"></i>&nbsp;&nbsp;&nbsp;<b>Phone Number: </b>{userData.phonenumber}</div>
                <hr className='hrtag'/><br/><div className="email"><i className="fas fa-solid fa-phone"></i>&nbsp;&nbsp;&nbsp;<b>Role: </b>{userData.role}</div>
                <hr className='hrtag'/><br/>
            </div>
            </div>
        </section>
    )
}