import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Warning } from "../components/Warning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../global";

export function SignInPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-200 rounded-lg shadow-md py-12 px-4 sm:px-6 lg:px-8">
                <Heading heading={"Sign In"} subheading={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"email"} name={"email"} onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <InputBox label={"Password"} placeholder={"password"} name={"password"} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <div className="flex justify-center">
                    <Button name={"Sign In"} onClick={async (e) => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate('/dashboard')
                    }} />
                </div>
                <Warning warning={"Dont have an account? "} linkText={"SignUp"} onClick={(e) => {
                    navigate('/signup')
                }} />
            </div>
        </div>
    )
}