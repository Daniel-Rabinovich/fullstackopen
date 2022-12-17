
const Filter = ({ onChange }) => {
    return (
        <div>
            <form>
                find countries
                <input onChange={onChange}/>
            </form>
        </div>
    )
}

export default Filter
