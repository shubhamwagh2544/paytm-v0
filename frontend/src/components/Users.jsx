import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

export function Users() {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                setUsers(res.data.users)
            })
    }, [filter])

    return (
        <div>
            <div>
                <div>
                    Users
                </div>
                <input type="text" placeholder="search users..." onChange={(e) => {
                    setFilter(e.target.value)
                }} />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                {user.firstname}
            </div>
            <Button name={"Send Money"} onClick={(e) => {
                navigate('/send?id=' + user._id + '&name=' + user.firstname)
            }} />
        </div>
    )
}