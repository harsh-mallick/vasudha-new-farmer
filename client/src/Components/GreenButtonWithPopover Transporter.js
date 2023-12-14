import React, { useState, useRef } from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

const GreenButtonWithPopover = (props) => {
    const [user, setUser] = useState({
        email_transporter: "",
        tprice: "",
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
        const { email_transporter, tprice} = user
        console.log(user)

        const res = await fetch("/transporting-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email_transporter, tprice
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
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef();

  const handlePopoverShow = () => {
    setShowPopover(true);
  };

  const handlePopoverHide = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setShowPopover(false);
    }
  };
  handlePopoverHide()

  const popover = (
    <Popover id="popover-basic" ref={popoverRef}>
      <Popover.Header as="h3">Popover Title</Popover.Header>
      <Popover.Body>
        Enter Email of Transporter: 
        <input type="text" name="email_transporter" id="email_transporter" value={user.email_transporter} onChange={handleInput}/><br/>
        Enter Your Transporting Price: 
        <input type="text" name="tprice" id="tprice" value={user.tprice} onChange={handleInput}/><br></br><br></br>
        <button type="button" class="btn btn-primary" onClick={postData}>Send Request</button>
      </Popover.Body>
    </Popover>
  );
    if(showPopover === false){
        return (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={showPopover}
              onToggle={(show) => setShowPopover(show)}
              overlay={popover}
            >
              <Button variant="success" onClick={handlePopoverShow}>
                {props.buttonName}
              </Button>
            </OverlayTrigger>
          );
    }else{
        return (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={showPopover}
              onToggle={(show) => setShowPopover(false)}
              overlay={popover}
            >
              <Button variant="success" onClick={handlePopoverHide}>
                Close
              </Button>
            </OverlayTrigger>
          );
    }
  
};

export default GreenButtonWithPopover;
