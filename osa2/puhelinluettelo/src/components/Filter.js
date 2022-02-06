const Filter = (props) => {
    return (
        <form onSubmit={props.onSubmit} >
            <div>
                filter shown with <input
                    value={props.newFilter}
                    onChange={props.onChange}
                />
            </div>
            <div>
                <button type="submit">filter</button>
            </div>
        </form>
    )
}

export default Filter