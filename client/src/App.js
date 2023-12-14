import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Singup from './Components/Signup';
import Navbar from './Components/Navbar'
import About from './Components/About'
import Logout from './Components/Logout';
import Buyer from './Components/Buyer';
import Transporter from './Components/Transporter';
import NotificationFarmer from './Components/Notification-farmer';
import Requests from './Components/MyRequest_Buyer';
import OurTeam from './Components/OurTeam';
import Others from './Components/Others';
import WeatherReport from './Components/WeatherReport';
import Laptop from './Components/Laptop';
import Intro from './Components/Intro';
import Maybenavbar from './Components/Maybenavbar';

function App() {
  return (
    <Router>
      <Maybenavbar>
        <Navbar />
      </Maybenavbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/about' element={<About />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/buyer' element={<Buyer />} />
        <Route path='/transporter' element={<Transporter />} />
        <Route path='/notification-farmer' element={<NotificationFarmer />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/team' element={<OurTeam />} />
        <Route path='/services' element={<Others />} />
        <Route path='/weather-details' element={<WeatherReport />} />
        <Route path='/laptop' element={<Laptop />} />
        <Route exact path='/intro' element={<Intro />} />
      </Routes>
    </Router>

  );
}

export default App;
