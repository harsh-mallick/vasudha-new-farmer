import React, { useEffect, useState } from 'react';
import "../Css/WeatherDetails.css"

const WeatherDetails = () => {
    const [userData, setUserData] = useState({});
    const [weatherData, setweatherData] = useState(null);
    const [weatherData2, setweatherData2] = useState(null);

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
            // console.log(data)
            setUserData(data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callAboutPage();
    });
    const place = userData.state
    const weatherapi = async () => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d1e15af09ee04dcf9a742254232111&q={city name=${place}`)
            const data = await response.json()
            // console.log(weatherData)
            if (weatherData === null) {
                setweatherData(data)
                // console.log(weatherData)
            } else {

            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        weatherapi();
    });

    const weatherapi2 = async () => {
        try {
            const response = await fetch(`https://dataservice.accuweather.com/locations/v1/search?q=${place}&apikey=MNREgdkdgHlFWgU2k7fXe1exA5LAmykY`)
            const data = await response.json()
            const lkey = data[0].Key
            console.log(lkey)
            try {
                const res = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${lkey}?apikey=MNREgdkdgHlFWgU2k7fXe1exA5LAmykY`)

                const data2 = await res.json();
                setweatherData2(data2)
                console.log(weatherData2[0].Temperature.Metric.Value)

                if (!res.status === 200) {
                    const error = new Error(res.error)
                    throw error
                }
            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        weatherapi2();
    });

    if (weatherData === null || weatherData2 === null) {
        return (
            <div className="weather-section">
                <div className="wapper">
                    <div className="Details"><div class="topbar">
                        <div class="headerTopic"><h2>Check Weather Details</h2></div>
                    </div>
                        <div className="Details-box">
                            <div className="Left-box">
                                <div className="display-box">
                                    <p>Location:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Wind Speed:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Temperature:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Humidity:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Precipitation:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                            </div>
                            <div className="Right-box">
                                <div className="display-box">
                                    <p>UV Index:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Wind Direction:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Air Pressure:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Air Quality:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                                <div className="display-box">
                                    <p>Cloud Cover:</p>
                                    <p>The Data cannot be fetched</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="weather-section">
                <div className="wapper">
                    <div className="Details"><div class="topbar">
                        <div class="headerTopic"><h2>Check Weather Details</h2></div>
                    </div>
                        <div className="Details-box">
                            <div className="Left-box">
                                <div className="display-box">
                                    <p>Location:</p>
                                    <p>{userData.state}</p>
                                </div>
                                <div className="display-box">
                                    <p>Wind Speed:</p>
                                    <p>{weatherData.current.wind_kph} kph</p>
                                </div>
                                <div className="display-box">
                                    <p>Temperature:</p>
                                    <p>{weatherData2[0].Temperature.Metric.Value} °C</p>
                                </div>
                                <div className="display-box">
                                    <p>Humidity:</p>
                                    <p>{weatherData.current.humidity}%</p>
                                </div>
                                <div className="display-box">
                                    <p>Precipitation:</p>
                                    <p>{weatherData.forecast.forecastday[0].day.totalprecip_mm}%</p>
                                </div>
                            </div>
                            <div className="Right-box">
                                <div className="display-box">
                                    <p>UV Index:</p>
                                    <p>{weatherData.forecast.forecastday[0].day.uv}</p>
                                </div>
                                <div className="display-box">
                                    <p>Wind Direction:</p>
                                    <p>{weatherData.current.wind_dir}</p>
                                </div>
                                <div className="display-box">
                                    <p>Air Pressure:</p>
                                    <p>{weatherData.current.pressure_mb} mb</p>
                                </div>
                                <div className="display-box">
                                    <p>Air Quality:</p>
                                    <p>500</p>
                                </div>
                                <div className="display-box">
                                    <p>Cloud Cover:</p>
                                    <p>{weatherData.current.cloud}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherDetails