const Person = ({ person, deletePerson }) => {
    return (
        <table>
            <tbody><tr><td>{person.name}, {person.number}</td></tr>
                <tr><td><button onClick={deletePerson}>delete</button></td></tr></tbody>
        </table>
    )
}

export default Person