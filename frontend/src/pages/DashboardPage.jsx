import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function DashboardPage() {

    const [balance, setBalance] = useState(0);
    const [name, setName] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                setBalance(res.data.balance)
            })
    }, [balance])

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/name', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((res) => {
                let fullName = res.data.firstname + " " + res.data.lastname
                setName(fullName)
            })
    })

    return (
        <>
            <div className="text-center py-8 bg-gray-200">
                <h1 className="text-3xl font-bold">Paytm App</h1>
                <div className="flex items-center justify-center">
                    <p className="text-xl mt-2">Hello,</p>
                    <p className="text-xl mt-2 ml-1 font-semibold text-blue-600">{name}</p>
                </div>
                <p className="text-xl mt-2">Your balance: <span className="text-blue-600 font-semibold">${balance}</span></p>
            </div>
            <div className="mx-auto max-w-md p-4">
                <Users />
            </div>
            <footer className="fixed bottom-0 w-full bg-gray-200 py-2 px-8 text-center">
                <button className="text-red-600 font-semibold hover:bg-red-100 px-4 py-2 rounded transition duration-300"
                    onClick={(e) => {
                        localStorage.removeItem("token")
                        navigate('/signin')
                    }}
                >
                    Sign Out
                </button>
            </footer>
        </>
    )
}
