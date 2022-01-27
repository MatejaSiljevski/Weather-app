import React from 'react'
import './styles.css'
import { useState, useEffect} from 'react'
import WeatherDetails from './WeatherDetails'

function SearchMain() {
    const [searchValue, setSearchValue] = useState('Belgrade')
    const [cityContent, setCityContent] = useState({})
    // const key = "d5706ed8f9241b7c1bcb1224c478eb5a"
    
    const handleEnterPress = (e) => {
        if(e.key === 'Enter' ){
           getWeatherInfo()
        }
    }


    const getWeatherInfo = async () => {
        try {
            let url = `//api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=d5706ed8f9241b7c1bcb1224c478eb5a`

            let res = await fetch(url);
            let data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weatherType } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
      
            const myNewWeatherInfo = {
              temp,
              humidity,
              pressure,
              weatherType,
              name,
              speed,
              country,
              sunset,
            };
      
            setCityContent(myNewWeatherInfo);
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo();
      }, []);

    return (
        <>
            <div className='wrap'>
                <div className="search">
                    <input type="search" placeholder='Search city' id='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyPress={handleEnterPress}/>
                    <div className="searchButton">
                        <button className="searchButton" onClick={getWeatherInfo}>
                            Search
                        </button> 
                    </div>
                </div>               
            </div>
            <WeatherDetails {...cityContent} />
        </>
    )
}

export default SearchMain
