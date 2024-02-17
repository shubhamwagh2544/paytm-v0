import { Button } from "./Button";

export function Warning({ warning, button }) {
    return (
        <div className="flex">
            {warning}
            <Button name={button} />
        </div>
    )
}