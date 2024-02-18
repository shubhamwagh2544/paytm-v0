import { Button } from "./Button";

export function Warning({ warning, button, onClick }) {
    return (
        <div className="flex">
            {warning}
            <Button name={button} onClick={onClick} />
        </div>
    )
}