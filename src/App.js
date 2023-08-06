// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// // import { Routes, Route, Link } from "react-router-dom";

// function App() {
//   let [weatherData ,setWeatherData] = useState();

//   useEffect(() => {
//     let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: 'https://pro.openweathermap.org/data/2.5/weather?q=karachi&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric',
//       headers: { }
//     };
    
//     axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       setWeatherData(JSON.stringify(response.data))
//     })
//     .catch((error) => {
//       console.log(error);
//       });
//   }, []);
//   return (
//     <>
//     <Navbar/>
// <h3>{weatherData}</h3>
//     </>
//   )
// }

// export default App;






import React, { useState } from "react";
import axios from "axios";
// import '../component/Weather.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Button, Form,Navbar , Container} from 'react-bootstrap';



const App = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState(null);
    let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    let date = new Date();

    const today = new Date();

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][day.getDay()];
      daysOfWeek.push(dayName);
    }
    
    // console.log(daysOfWeek); // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    

// var pakistanDate = date.toLocaleString("en-US", {timeZone: "Asia/Karachi"});
// console.log(pakistanDate);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://pro.openweathermap.org/data/2.5/weather?q=${query}&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric`)
            .then((response) => {

                setWeather(response.data);
                console.log(weather)
            //     console.log('https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png')
            //     console.log('https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@8x.png')
            //     console.log('https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@4x.png')
            //     console.log('https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@6x.png')

            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
<>

      <Navbar className="bg-body-tertiary">
         <Container>
         <h4>{date.toString().substring(3,15)}</h4>
        <Navbar.Brand href="#home" style={{margin:"10px auto"}}>
          <h1>Weather App</h1>
          </Navbar.Brand>
       </Container>
      </Navbar>
        {/* <div>
            <div style={{display:'flex'}}>
            <h4>{date.toString().substring(3,15)}</h4>
            <h1 style={{marginLeft:30+'%'}}>Weather app</h1>
            </div> */}

            <div style={{ display: 'flex', width: 100 + '% ', padding: 40, margin: 'auto' }}>
                <Form.Control className="mx-3" type="text" placeholder="Enter a city name" value={query}
                    onChange={handleChange} />
                <Button variant="secondary" onClick={handleSubmit}>Search</Button>
            </div>

            {/* <input
        type="text"
        placeholder="Enter a city name"
        value={query}
        onChange={handleChange}
      /> */}
            {weather && (
                <div>
                    <div style={{display:"flex",justifyContent:'space-evenly',marginRight:50+'px'}}>
                        <div>
                    <h2 style={{ textAlign: 'start', marginLeft: 40 + 'px' }}> {weather.name}  <h1>{weather.main.temp}°C</h1></h2>

                        </div>
                        <div>
                        <img width={100} src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + '.png'} alt="" />

                        </div>
                    </div>
                    <div
                     style={{ display: 'flex', justifyContent: 'space-between', margin: 0, paddingLeft: 40, paddingRight: 40, paddingBottom: 4, borderRadius: 5 + 'px', paddingTop: 4, backgroundColor: 'lightblue' ,marginLeft:80,marginRight:80}}>
                        <h3>  Feels like </h3> <h3>{weather.main.feels_like}°C</h3>

                    </div>
                    <div
                     style={{ display: 'flex', justifyContent: 'space-between', margin: 0, paddingLeft: 40, paddingRight: 40, paddingBottom: 4, borderRadius: 5 + 'px', paddingTop: 4, backgroundColor: 'lightblue' ,marginLeft:80,marginRight:80,marginTop:10}}>
                        <h3>  Min Temp </h3> <h3>{weather.main.temp_min}°C</h3>

                    </div>
                    <div
                     style={{ display: 'flex', justifyContent: 'space-between', margin: 0, paddingLeft: 40, paddingRight: 40, paddingBottom: 4, borderRadius: 5 + 'px', paddingTop: 4, backgroundColor: 'lightblue' ,marginLeft:80,marginRight:80,marginTop:10}}>
                        <h3>  Max Temp </h3> <h3>{weather.main.temp_max}°C</h3>

                    </div>
                    <div
                     style={{ display: 'flex', justifyContent: 'space-between', margin: 0, paddingLeft: 40, paddingRight: 40, paddingBottom: 4, borderRadius: 5 + 'px', paddingTop: 4, backgroundColor: 'lightblue' ,marginLeft:80,marginRight:80,marginTop:10}}>
                        <h3>  Could </h3> <h3>{weather.weather[0].description}</h3>

                    </div>
                    <div
                     style={{ display: 'flex', justifyContent: 'space-between', margin: 0, paddingLeft: 40, paddingRight: 40, paddingBottom: 4, borderRadius: 5 + 'px', paddingTop: 4, backgroundColor: 'lightblue' ,marginLeft:80,marginRight:80,marginTop:10}}>
                        <h3>  Air Speed </h3> <h3>{weather.wind.speed}Km/h</h3>

                    </div>
                

                  <div id="idcards">
                    <div className="Cards">
                      <h3>{daysOfWeek[0]}</h3>
                    <img width={100} src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + '.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[1]}</h3>
                    <img width={100} src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[2]}</h3>
                    <img width={100} src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@4x.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[3]}</h3>
                    <img width={100} src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + '.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[4]}</h3>
                    <img width={100} src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[5]}</h3>
                    <img width={100} src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} alt="" />
                     
                    </div>
                    <div className="Cards">
                      <h3>{daysOfWeek[6]}</h3>
                    <img width={100} src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@4x.png'} alt="" />
                     
                    </div>
                  


                  </div>

                </div>
            )}
        {/* </div> */}
        </>
    );
};

export default App;