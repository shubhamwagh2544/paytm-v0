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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-200 rounded-lg shadow-md py-10 px-8 sm:px-10 lg:px-12">
                <Heading heading={"Sign Up"} subheading={"Enter your information to create an account"} />
                <form className="mt-8 space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstname,
                        lastname,
                        password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate('/dashboard');
                }}>
                    <div className="space-y-4">
                        <InputBox label={"Firstname"} placeholder={"firstname"} name={"firstname"} onChange={(e) => {
                            setFirstname(e.target.value);
                        }} />
                        <InputBox label={"Lastname"} placeholder={"lastname"} name={"lastname"} onChange={(e) => {
                            setLastname(e.target.value);
                        }} />
                        <InputBox label={"Email"} placeholder={"email"} name={"email"} onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <InputBox label={"Password"} placeholder={"password"} name={"password"} type="password" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <div className="flex justify-center">
                        <Button name={"Sign Up"} type="submit" />
                    </div>
                </form>
                <Warning warning={"Already have an account? "} linkText={"SignIn"} onClick={(e) => {
                    navigate('/signin');
                }} />
            </div>
        </div>

    );
}
