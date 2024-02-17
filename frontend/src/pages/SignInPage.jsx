import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Warning } from "../components/Warning";

export function SignInPage() {
    return (
        <>
            <Heading heading={"Sign In"} subheading={"Enter your credentials to access your account"} />
            <InputBox label={"email"} placeholder={"email"} name={"email"} />
            <InputBox label={"password"} placeholder={"password"} name={"password"} />
            <Button name={"Sign In"} />
            <Warning warning={"Dont have an account? "} button={"SignUp"} />
        </>
    )
}