import React from 'react'
import '../Css/Team.css'
import Profile from '../Images/Profile.png'
import Krisha from '../Images/Krisha.jpg'
import Krisha1 from '../Images/Piyush.jpg'
import Harsh from '../Images/hmlord.jpg'
import Tejas from '../Images/Tejas.jpg'

const OurTeam = () => {
  return (
    <div>
      <div class="cardpanel-team">
        <div class="container-team">
          <div class="card-team">
            <img src={Harsh} alt="Harsh Mallick" className='img-team' style={{ height: "260px" }} />
            <h2 className="h2-team">Harsh Mallick</h2>
            <p className='p-team'>
              Major work of website is powered by a backend servers. He is
              responsible for writing the backend codes of our website and
              ensuring that it runs smoothly. He also gave the idea for the project.
            </p>
          </div>
          <div class="card-team">
            <img src={Krisha1} alt="Piyush Raj" className='img-team' style={{ height: "260px" }} />
            <h2 className="h2-team">Piyush Raj</h2>
            <p className='p-team'>
              Nothing is good when its not pleasing to the eyes. He is responsible
              for writing the frontend codes of our website and makes sure that it
              looks great.
            </p>
          </div>
          <div class="card-team">
            <img src={Krisha} alt="Krisha Rastogi" className='img-team' style={{ height: "240px" }} />
            <h2 className="h2-team">Krisha Rastogi</h2>
            <p className='p-team'>
              Nothing is possibe without a documentary. She is responsible for
              writing and compiling the documents necessary for the formality of
              the project.
            </p>
          </div>
          <div class="card-team">
            <img src={Tejas} alt="Tejas Garg" className='img-team' style={{ height: "285px" }} />
            <h2 className="h2-team">Tejas Garg</h2>
            <p className='p-team'>
              All feels alone without a helper. He contributed in almost all the
              fields. He helped Krisha in the writeup and worked as an irritator the
              whole time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurTeam
