import { React, useEffect } from 'react';
import { useNavigate } from 'react-router'

const Logout = () => {
    const history = useNavigate()
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            window.localStorage.setItem("homereload", "true")
            window.localStorage.setItem("payload", "false")
            history('/')
            window.location.reload()
            if(res.status !== 200){
                const error = new Error(res.error)
                throw error
            }
        }).catch((err) => {
            console.log(err)
        })
    })

  return (
    <div>Logout</div>
  )
}

export default Logout