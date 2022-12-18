import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({country}) => {

    const [weather ,setWeather] = useState({})

    // get the list of the languages in the country
    const extractLanguages = (country) => {
        let listLang = []
        for (let key in country.languages){
            listLang.push(country.languages[key])
        }
        return listLang
    }

    // fetch weather data once country is changed
    useEffect(() => {
        axios
        .get(`https://wttr.in/${country.name.common}?format=j1`)
        .then(response => {
            const current = response.data.current_condition[0]
            setWeather({
                temp: current.temp_C,
                wind: current.windspeedKmph
            })
        })
        .catch(error => console.log("error fetching weather data", error))
    } ,[country])


    return (
        <div>
            <h1>
                {country.name.common}
            </h1>
            <div>
                capital: {country.capital}
            </div>
            <div>
                area: {country.area}
            </div>
            <div>
                <p>
                    <b>Languages</b>
                </p>
                <ul>
                    {extractLanguages(country).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.name.common}   />
            </div>
            <div>
                <h2>Weather in {country.name.common}</h2>
                <div>
                    temperature: {weather.temp} C
                </div>
                <div>
                    wind: {weather.wind} Kmph
                </div>
            </div>
        </div>
    )
}

export default Country
