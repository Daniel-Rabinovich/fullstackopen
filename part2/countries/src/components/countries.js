import { useState, useEffect } from 'react'
import Country from './country'

const Countries = ({ countries }) => {

    const [country, setCountry] = useState({})
    const [countryChosen, setCountryChosen] = useState(false)

    // grab country info and save it in a state
    const handleClick = (e) => {
        e.preventDefault()
        const newCountry = countries.filter(country => {
            return country.name.common === e.target.firstChild.data
        })
        setCountry(newCountry[0])
        setCountryChosen(true)
    }

    // display the country if clicked show
    const output = () => {
        if(countryChosen){
            return <Country country={country} />
        } else {
            return (
                <div>
                    {countries.map(
                        (country, i) =>
                        <div key={country.name.common}>
                            <form onSubmit={handleClick}>
                                {country.name.common}
                                <button type="submit">show</button>
                            </form>
                        </div>
                    )}
                </div>
            )
        }
    }

    return output()
}

export default Countries
