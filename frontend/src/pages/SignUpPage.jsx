import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Warning } from "../components/Warning";

export function SignUpPage() {
    return (
        <>
            <Heading heading={"Sign Up"} subheading={"Enter your information to create an account"} />
            <InputBox label={"firstname"} placeholder={"firstname"} name={"firstname"} />
            <InputBox label={"lastname"} placeholder={"lastname"} name={"lastname"} />
            <InputBox label={"email"} placeholder={"email"} name={"email"} />
            <InputBox label={"password"} placeholder={"password"} name={"password"} />
            <Button name={"Sign Up"} />
            <Warning warning={"Already have an account? "} button={"LogIn"} />
        </>
    )
}