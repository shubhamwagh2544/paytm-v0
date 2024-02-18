import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export function SendMoneyPage() {

    const [amount, setAmount] = useState(0)
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")

    return (
        <>
            <Heading heading={"Send Money"} />
            <div>
                (U) {name}
            </div>
            <div>
                <div>amount</div>
                <input type="number" id="amount" placeholder="Enter amount" onChange={(e) => {
                    setAmount(e.target.value)
                }} />
            </div>
            <Button name={"Initiate Transfer"} onClick={(e) => {
                axios.post('http://localhost:3000/api/v1/account/transfer/v2', {
                    to: id,
                    amount: parseInt(amount)
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
            }} />
        </>
    )
}