const Filter = (props) => {

    return (
        <div>
            <form>
                filter showen with:
                <input onChange={props.change} />
            </form>
        </div>
    )
}

export default Filter
