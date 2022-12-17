import React from 'react';
import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Countries from './components/countries'
import Country from './components/country'
import axios from 'axios'

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  // pull data from api once
  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => setCountries(response.data))
    .catch(error => console.log("Error fetching countries from api",error))
  },[])


  // update search state
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    let newList = []
    for(let i=0; i<countries.length;i++){
        const countryName = countries[i].name.common.toLowerCase()
        const cleanedSearch = e.target.value.toLowerCase()
        if (countryName.includes(cleanedSearch))
            newList.push(countries[i])
    }
    setFilteredCountries(newList)
  }

  // prepare conditional output
  const output = () => {
    const len = filteredCountries.length
    if (len===0) {
      return <div>nothing found</div>
    } else if (len===1) {
      return <Country country={filteredCountries[0]} />
    } else if (1<len && len<=10) {
      return <Countries countries={filteredCountries} />
    } else {
      return <div>Too many matches</div>
    }
  }

  return (
    <div>
      <Filter
        onChange={handleSearchChange}
      />
      {output()}
    </div>
  )
}

export default App;
