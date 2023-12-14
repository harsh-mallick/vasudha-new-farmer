import React from 'react'
import '../Css/Others.css'
import { Link } from "react-router-dom"

const Others = () => {
    return (
        <div className="body">
            <div class="more-services">
                <div class="back-ground-parent">
                    <div class="back-ground"></div>
                    <div class="more-services-parent">
                        <h3 class="more-services1">More Services</h3>
                        <div class="crop-yield-predictor-parent">
                            <Link to="/"><p class="crop-yield-predictor">Crop Yield Predictor</p></Link>
                            <Link to="/"><p class="check-soil-details">Check Soil Details</p></Link>
                            <Link to="/weather-details"><p class="check-weather-details">Check Weather Details</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Others
