import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Warning } from "../components/Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return (
        <>
            <Heading heading={"Sign Up"} subheading={"Enter your information to create an account"} />
            <InputBox label={"firstname"} placeholder={"firstname"} name={"firstname"} onChange={(e) => {
                setFirstname(e.target.value)
            }} />
            <InputBox label={"lastname"} placeholder={"lastname"} name={"lastname"} onChange={(e) => {
                setLastname(e.target.value)
            }} />
            <InputBox label={"email"} placeholder={"email"} name={"email"} onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <InputBox label={"password"} placeholder={"password"} name={"password"} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <Button name={"Sign Up"} onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstname,
                    lastname,
                    password
                })
                localStorage.setItem("token", response.data.token)
                navigate('/dashboard')
            }} />
            <Warning warning={"Already have an account? "} button={"LogIn"} onClick={(e) => {
                navigate('/signin')
            }} />
        </>
    )
}