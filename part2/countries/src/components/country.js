
const Country = ({country}) => {

    const extractLanguages = (country) => {
        let listLang = []
        for (let key in country.languages){
            listLang.push(country.languages[key])
        }
        return listLang
    }

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
                <p><b>Languages</b></p>
                <ul>
                {extractLanguages(country).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} />
            </div>
        </div>
    )
}

export default Country
