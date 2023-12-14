const express = require('express');
const app = express()
const router = express.Router();
require("../db/conn");
const Email = require('../model/email');
const Farmer = require('../model/FarmerUserSchema');
const bcrypt = require('bcryptjs')
const cors = require("cors");
const farmerauthenticate = require('../middleware/farmerauthenticate');
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(cookieParser())
const SellingRequest = require('../model/Sellingrequest')
const TransportingRequest = require('../model/Transporting')
const BuyingRequest = require('../model/BuyingRequest')

//<------------------------------------------------------------------------------------------------------------------------------------------------------------------------->


// Consumer routes
router.post('/farmer-signup', async (req, res) => {
    const { name_farmer, aadharnumber, role, locality, state, address, pincode, phonenumber, crptype, offerprice, email, password } = req.body;
    console.log(req.body)
    // Checking if any field is blank
    if (!name_farmer || !aadharnumber || !role || !locality || !state || !address || !pincode || !phonenumber || !email || !password) {
        console.log("Cannot cannot retrieve data as field is/ are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }

    try {
        // Checking if a user with an email already exists
        const userExist = await Farmer.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "The email Id already exists" });
        }

        // Registering a new user 
        const user = new Farmer(req.body);

        // Checking that registration successful or failed
        try {
            await user.save();

            res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to register" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
});


router.post('/selling-request', farmerauthenticate, async (req, res) => {
    const name_farmer = req.rootUser.name_farmer
    const email_farmer = req.rootUser.email
    const values = `{"name_farmer": "${name_farmer}", "email_farmer": "${email_farmer}"}`
    const fvalue = JSON.parse(values)
    console.log(fvalue)
    const { email_buyer, bprice } = req.body;
    console.log(req.body)
    const totalvalue = { ...req.body, ...fvalue }
    console.log(totalvalue)
    // Checking if any field is blank
    if (!name_farmer || !email_buyer) {
        console.log("Cannot cannot retrieve data as field is/ are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }

    try {

        // Registering a new user 
        const Request = new SellingRequest(totalvalue);
        console.log(Request)

        // Checking that registration successful or failed
        try {
            await Request.save();

            res.status(200).json({ message: "Data added successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to add data" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/buying-request', farmerauthenticate, async (req, res) => {
    const name_farmer = req.rootUser.name_farmer
    const email_buyer = req.rootUser.email
    const values = `{"name_farmer": "${name_farmer}", "email_buyer": "${email_buyer}"}`
    const fvalue = JSON.parse(values)
    // console.log(fvalue)
    const { email_farmer, bprice } = req.body;
    // console.log(req.body)
    const totalvalue = { ...req.body, ...fvalue }
    // console.log(totalvalue)
    // Checking if any field is blank
    if (!name_farmer || !email_farmer) {
        console.log("Cannot cannot retrieve data as field is/ are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }

    try {

        // Registering a new user 
        const Request = new BuyingRequest(totalvalue);
        // console.log(Request)

        // Checking that registration successful or failed
        try {
            await Request.save();

            res.status(200).json({ message: "Data added successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to add data" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
});


router.post('/transporting-request', farmerauthenticate, async (req, res) => {
    const name_farmer = req.rootUser.name_farmer
    const email_farmer = req.rootUser.email
    const values = `{"name_farmer": "${name_farmer}", "email_farmer": "${email_farmer}"}`
    const fvalue = JSON.parse(values)
    console.log(fvalue)
    const { email_transporter, tprice } = req.body;
    console.log(req.body)
    const totalvalue = { ...req.body, ...fvalue }
    console.log(totalvalue)
    // Checking if any field is blank
    if (!email_transporter || !email_farmer) {
        console.log("Cannot cannot retrieve data as field is/ are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }

    try {

        // Registering a new user 
        const Request = new TransportingRequest(totalvalue);
        console.log(Request)

        // Checking that registration successful or failed
        try {
            await Request.save();

            res.status(200).json({ message: "Data added successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to add data" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
});







// Post Request: Making a Consumer Login
router.post('/farmer-signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Checking if any field is blank
        if (!email || !password) {
            console.log("Cannot cannot retrieve data as a feild is blank")
            return res.status(422).json({ error: "None of the feilds can be blank" });
        }

        // Checking if a user with an email  exists
        const userLogin = await Farmer.findOne({ email: email });
        if(userLogin.role == "Buyer" || userLogin.role == "Transporter"){
            console.log("You cannot login as a buyer on farmer page")
            return res.status(422).json({ error: "You cannot login as a buyer on farmer page" });
        }else{
        // console.log(userLogin)

        if (userLogin) {
            const isMatch = await bcrypt.compare(password + "23945", userLogin.password)
            // console.log(isMatch)

            const token = await userLogin.generateAuthToken();
            // console.log(token)

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            })
            // console.log(isMatch)

            if (!isMatch) {
                res.status(400).json({ error: "Incorrect credential" })
            } else {
                res.json({ message: "Login successful              Your JWT: " + token })
            }
        } else {
            res.status(400).json({ error: "Incorrect credential" })
        }

    }} catch (error) {
        console.log(error);
    }
});


// Get Request: Retrieve Farmer Profile Info
router.get('/getFarmerdata', farmerauthenticate, (req, res) => {
    res.send(req.rootUser);
})
router.get('/getFarmerrequest', farmerauthenticate, async (req, res) => {
    const userEmail = req.rootUser.email
    // console.log(userEmail)
    const data = await SellingRequest.find({ email_buyer: userEmail })
    res.send(data)
})
router.get('/getbuyingrequest', farmerauthenticate, async (req, res) => {
    const userEmail = req.rootUser.email
    // console.log(userEmail)
    const data = await BuyingRequest.find({ email_farmer: userEmail })
    res.send(data)
})
router.get('/requests', farmerauthenticate, async (req, res) => {
    const userRole = req.rootUser.role
    console.log(userRole)
    const userEmail = req.rootUser.email
    console.log(userEmail)
    if (userRole === "Farmer") {
        const data = await SellingRequest.find({ email_farmer: userEmail })
        res.send(data)
    }else if (userRole === "Buyer") {
        const data = await BuyingRequest.find({ email_buyer: userEmail })
        console.log(data)
        res.send(data)
    }else if (userRole === "Transporter") {
        const data = await TransportingRequest.find({ email_transporter: userEmail })
        console.log(data)
        res.send(data)
    }
    // console.log(userEmail)

})


router.get('/getBuyerdata', async (req, res) => {
    const buyerdata = await Farmer.find({ role: "Buyer" })
    // console.log(buyerdata)
    res.send(buyerdata)
})
router.get('/getTransporterdata', async (req, res) => {
    const transporterdata = await Farmer.find({ role: "Transporter" })
    res.send(transporterdata)
})
router.get('/getFarmerdatas', async (req, res) => {
    const farmerdata = await Farmer.find({ role: "Farmer" })
    // console.log(farmerdata)
    res.send(farmerdata)
})

router.post('/updatebuyer', farmerauthenticate, async (req, res) => {
    const { Crptype, offerprice } = req.body
    // console.log(req.body)
    const root = req.rootUser
    try {
        const update = await Farmer.findByIdAndUpdate({ _id: root._id }, {
            $set: {
                Crptype: Crptype,
                offerprice: offerprice
            }
        })
        console.log(update)
        res.status(200).json("Change Successful")
    } catch (error) {
        console.log(error)
    }
})
router.post('/accept', farmerauthenticate, async (req, res) => {
    const { Request_Id } = req.body
    // console.log(req.body)
    try {
        const update = await SellingRequest.findOneAndUpdate({ _id: Request_Id }, { type: "Accepted", })
        console.log(update)
        if (update === null) {
            const update = await BuyingRequest.findOneAndUpdate({ _id: Request_Id }, { type: "Accepted", })
            // console.log(update)
        }
        res.status(200).json("Change Successful")
    } catch (error) {
        console.log(error)
    }
})
router.post('/decline', farmerauthenticate, async (req, res) => {
    const { Request_Id } = req.body
    // console.log(req.body)
    try {
        const update = await SellingRequest.findOneAndUpdate({ _id: Request_Id }, { type: "Declined", })
        console.log(update)
        if (update === null) {
            const update = await BuyingRequest.findOneAndUpdate({ _id: Request_Id }, { type: "Declined", })
            // console.log(update)
        }
        res.status(200).json("Change Successful")
    } catch (error) {
        console.log(error)
    }
})



// Home page send email route
router.post('/sendEmail', farmerauthenticate, async (req, res) => {
    const { cname, cemail, cmessage } = req.body;
    // Checking if any field is blank
    if (!cname || !cemail || !cmessage) {
        console.log("Cannot retrieve data as a field is blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }
    try {

        // Adding a new admission form
        const email = new Email({
            cname, cemail, cmessage, user: req.rootUser._id
        });
        // Checking that adding successful or failed
        try {
            await email.save();

            res.status(201).json({ message: "Message sent successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to send message" });
            // console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
})

// Logging out a user
router.get('/logout', (req, res) => {
    console.log("Logout Page");
    res.clearCookie('jwtoken', { path: "/" })
    res.clearCookie('itemid', { path: "/" })
    res.status(200).send("User Logged out")
})

module.exports = router;