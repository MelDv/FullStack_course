const Notification = (props) => {
    if (props.message === null) {
        return null
    }
    const messageStyle = {
        color: props.isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    return (
        <div style={messageStyle}>
            {props.message} {props.isError}
        </div>
    )
}

export default Notification