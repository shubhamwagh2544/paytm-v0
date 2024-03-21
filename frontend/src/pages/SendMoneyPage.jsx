import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BACKEND_URL from "../../global";

export function SendMoneyPage() {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-200 rounded-lg shadow-md py-12 px-4 sm:px-6 lg:px-8">
                <Heading heading={"Send Money"} />
                <p className="text-xl text-blue-600 text-center font-semibold">sending money to {name} ...</p>

                <div className="mt-4">
                    <label htmlFor="amount" className="block mb-2">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <Button
                        name={"Initiate Transfer"}
                        onClick={async (e) => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/account/transfer/v2`,
                                { to: id, amount: parseInt(amount) },
                                { headers: { Authorization: localStorage.getItem("token") } }
                            );
                            if (response.status === 200) navigate('/dashboard');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
