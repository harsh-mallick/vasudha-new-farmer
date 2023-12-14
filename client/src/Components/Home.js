import { React, useState } from 'react'
import '../Css/Home.css'
import { useTranslation } from 'react-i18next';
import Wholesale from "../Images/Wholesale.jpg"
import Farmer from "../Images/Farmer.jpg"
import Transporter from "../Images/Transpoter.jpg"
import Information from "../Images/information.png"
import Laptop from './Laptop';

const Home = () => {
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    // const [scrollt, setScrollt] = useState()
    // window.addEventListener("scroll", () => {
    //     const verticalScrollPx = window.scrollY || window.pageYOffset;
    //     console.log(verticalScrollPx)
    //     if (verticalScrollPx < 3) {
    //         setScrollt(1)
    //         console.log(scrollt)
    //     } else {
    //         setScrollt(0)
    //     }
    // })
    // if (scrollt === 1) {
    //     document.getElementById("html").style.overflowY = "hidden";
    //     document.getElementById("main").style.scale = "100px"

    // } else {
    //     document.body.style.overflowY = "scroll"
    // }

    const { t } = useTranslation();

    const [user, setUser] = useState({
        cname: "",
        cemail: "",
        cmessage: "",
    });

    let name, value;
    const handleInput = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    const email = async (e) => {
        e.preventDefault();
        const { cname, cemail, cmessage } = user

        const res = await fetch("/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cname, cemail, cmessage
            })
        });
        const data = await res.json();
        console.log(data)
        console.log(res.status)
        if (res.status === 422 || res.status === 404 || !data) {

            window.alert("Cannot send message")
            console.log("Cannot send message")

        } else if (res.status === 500) {
            window.alert("Internal Server Error")
            console.log("Internal Server Error")
        } else {
            window.alert("Message sent Successfully");
            console.log("Message sent Successfully");
            setUser("")
        };
    }
    if (window.localStorage.getItem("homereload") === "true") {
        window.location.reload()
        window.localStorage.setItem("homereload", "flase")
    }

    window.localStorage.setItem("visited", "flase")
    const payloadfalse = () => {
        if (window.localStorage.getItem("visited") === "false") {
            window.localStorage.setItem("payload", "false")
            window.localStorage.setItem("visited", "true")
            window.location.reload()
        }
    }
    window.addEventListener("load", payloadfalse)
    window.addEventListener("scroll", setScrollVar)
    window.addEventListener("resize", setScrollVar)
    function setScrollVar() {
        const htmlElement = document.documentElement
        const percentofscreenheightScrolled = htmlElement.scrollTop / htmlElement.clientHeight
        console.log(Math.min(percentofscreenheightScrolled * 100, 129))
        htmlElement.style.setProperty("--scroll", Math.min(percentofscreenheightScrolled * 100, 100))
        if (Math.min(percentofscreenheightScrolled * 100, 129) > 5 && Math.min(percentofscreenheightScrolled * 100, 129) < 8) {
            document.getElementById("main-1").style.transform = "scale(1.08)"
        }
        if (Math.min(percentofscreenheightScrolled * 100, 129) > 8 && Math.min(percentofscreenheightScrolled * 100, 129) < 11) {
            document.getElementById("main-1").style.transform = "scale(1.05)"
        }
        if (Math.min(percentofscreenheightScrolled * 100, 129) > 11 && Math.min(percentofscreenheightScrolled * 100, 129) < 14) {
            document.getElementById("main-1").style.transform = "scale(1.02)"
        }
        if (Math.min(percentofscreenheightScrolled * 100, 129) > 14 && Math.min(percentofscreenheightScrolled * 100, 129) < 17) {
            document.getElementById("main-1").style.transform = "scale(1.0)"
        }
        if (Math.min(percentofscreenheightScrolled * 100, 129) > 17 && Math.min(percentofscreenheightScrolled * 100, 129) < 26) {
            document.getElementById("main-1").style.transform = "scale(0.94)"
        }
    }
    setScrollVar()





    return (
        <>
            <div className="main-1" id='main-1'>
                <Laptop style={{ width: "95%" }} />
            </div>



            <div class="about-container reveal fade-bottom" id='aboutus'>
                <div>
                    <p class="aboutus-Topic">ABOUT US</p>
                    <p class="about-Para">
                        This website serves as a valuable tool for farmers across the country, offering them the means to
                        enhance
                        their agricultural
                        yield through the power of predictive analysis. By leveraging advanced algorithms and incorporating data
                        on
                        climate patterns
                        and soil fertility, this platform empowers farmers to make informed decisions about their farming
                        practices.

                        Upon inputting their farm data, such as crop types, planting dates, and soil composition, the website
                        utilizes the available
                        weather API and soil fertility data to generate personalized reports. These reports provide farmers with
                        crucial insights into
                        the optimal conditions for their crops, enabling them to plan their activities accordingly.</p>
                    <br /><br />
                    <p class="Made">Made easy for you!</p>
                </div>

                <img class="about-img" src={Information} alt="Info" />
            </div>
            <div class="cardpanel reveal fade-bottom" id='cardpanel'>
                <div class="cardpanel-topic">
                    Our Main Users
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src={Wholesale} alt="Card PNG" />
                    </div>
                    <div class="card-content">
                        <h2>Wholesale Buyer</h2>
                        <p>
                            Wholesale buyers are businesses or individuals who purchase goods in
                            bulk directly from farmers. They often buy products at a lower price
                            and then resell them to retailers or end consumers, contributing to
                            the distribution of goods in the market.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src={Farmer} alt="Card PNG" />
                    </div>
                    <div class="card-content">
                        <h2>Farmer</h2>
                        <p>
                            Farmers play a vital role in our society as they are responsible for
                            producing the food we eat. Their hard work and dedication contribute
                            significantly to the agricultural sector. Despite of numerous
                            challenges, farmers ensure that the food supply is stable and secure
                            for the growing populations.
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img">
                        <img src={Transporter} alt="Card PNG" />
                    </div>
                    <div class="card-content">
                        <h2>Transporter</h2>
                        <p>
                            Transporters of goods are responsible for the movement and delivery
                            of goods from one location to another. They play a critical role in
                            the supply chain, ensuring that goods are efficiently transported,
                            enabling businesses to meet the demands of consumers and markets.
                        </p>
                    </div>
                </div>
            </div>
            <div class="container-contactus reveal fade-bottom">
                <form action="/action_page.php">
                    <label for="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.." className='input' />

                    <label for="fname">You email</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your email.." className='input' />

                    <label for="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: " 200px" }} className='textarea'></textarea>

                    <input type="submit" value="Submit" className='submit' />
                </form>
            </div>

        </>
    )
}

export default Home