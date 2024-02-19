import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";

export function DashboardPage() {

    const [balance, setBalance] = useState(0);

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

    return (
        <>
            <div>
                Paytm App
            </div>
            <div>
                Hello, User (U)
            </div>

            <div>
                Your balance ${balance}
            </div>
            <Users />
        </>
    )
}