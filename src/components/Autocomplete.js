import React, { useEffect, useState } from 'react'

const Autocomplete = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shoeDropdown, setShowDropdown] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const [filterUsers, setFilterUsers] = useState([])
    async function fetchUser() {
        try {
            setLoading(true);
            const fetchData = await fetch("https://dummyjson.com/users");
            const data = await fetchData.json();
            if (data && data.users && data.users.length) {
                setUsers(data.users).map((userItem) => userItem.firstName);
            }
        } catch (err) {
            setLoading(false)
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchUser();

    }, [])
    function handleChange(event) {
        const query = event.target.value.toLowerCase();
        setSearchParam(query);
        if (query.length > 1) {
            const filteredData =
                users && users.length
                    ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
                    : [];
            setFilterUsers(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }
    console.log(users,filterUsers)
    return (
        <div>
            <div>
                <input placeholder='Enter name' onChange={(e) => handleChange(e)} value={searchParam} />
            </div>
            {users.map((user) => (
                <h3 key={user.id}>{user.firstName}</h3>
            ))}
        </div>
    )
}

export default Autocomplete