import React, { useState, useRef } from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

const RedButtonWithPopover = (props) => {
  const [user, setUser] = useState({
    Request_Id: "",
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
    const { Request_Id } = user
    console.log(user)

    const res = await fetch("/decline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Request_Id,
      })
    });
    const data = await res.json();
    console.log(data)
    console.log(res.status)
    if (res.status === 422 || res.status === 404 || !data) {

      window.alert("Cannot Decline Request")
      console.log("Cannot Decline Request")

    } else if (res.status === 500) {
      window.alert("Internal Server Error")
      console.log("Internal Server Error")
    } else {
      window.alert("Request Declined");
      console.log("Request Declined");
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
        Enter Request Id from above:
        <input type="text" name="Request_Id" id="Request_Id" value={user.Request_Id} onChange={handleInput} /><br /><br />
        <button type="button" class="btn btn-danger" onClick={postData}>Decline Request</button>
      </Popover.Body>
    </Popover>
  );
  if (showPopover === false) {
    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        overlay={popover}
      >
        <Button variant="danger" onClick={handlePopoverShow}>
          {props.buttonName}
        </Button>
      </OverlayTrigger>
    );
  } else {
    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        show={showPopover}
        onToggle={(show) => setShowPopover(false)}
        overlay={popover}
      >
        <Button variant="danger" onClick={handlePopoverHide}>
          Close
        </Button>
      </OverlayTrigger>
    );
  }

};

export default RedButtonWithPopover;
