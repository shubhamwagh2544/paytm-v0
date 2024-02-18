import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Warning } from "../components/Warning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignInPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return (
        <>
            <Heading heading={"Sign In"} subheading={"Enter your credentials to access your account"} />
            <InputBox label={"email"} placeholder={"email"} name={"email"} onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <InputBox label={"password"} placeholder={"password"} name={"password"} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <Button name={"Sign In"} onClick={async (e) => {
                const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                    username,
                    password
                })
                localStorage.setItem("token", response.data.token)
                navigate('/dashboard')
            }} />
            <Warning warning={"Dont have an account? "} button={"SignUp"} onClick={(e) => {
                navigate('/signup')
            }} />
        </>
    )
}