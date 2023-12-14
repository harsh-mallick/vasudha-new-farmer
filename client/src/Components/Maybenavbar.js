import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Maybenavbar = ({ children }) => {
    const location = useLocation()
    const [showNavbar, setshowNavbar] = useState(false)
    useEffect(() => {
        console.log("this is location: ", location)
        if (location.pathname === "/laptop" || location.pathname === "/intro") {
            setshowNavbar(false)
        } else {
            setshowNavbar(true)
        }
    })
    return (
        <div>{showNavbar && children}</div>
    )
}

export default Maybenavbar
