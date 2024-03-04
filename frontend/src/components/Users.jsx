import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import BACKEND_URL from "../../global"

export function Users() {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                setUsers(res.data.users)
            })
    }, [filter])

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Users</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border border-gray-300 px-2 py-1 rounded-lg"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                />
            </div>
            <div className="mt-4">
                {users && users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate()
    return (
        <div className="border border-gray-300 rounded-lg p-4 mt-2 flex items-center justify-between">
            <p>{user.firstname + ' ' + user.lastname}</p>
            <Button name={"Send"} onClick={(e) => {
                navigate('/send?id=' + user._id + '&name=' + user.firstname)
            }} />
        </div>
    )
}
