export function InputBox({ label, placeholder, name }) {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input type="text" placeholder={placeholder} name={name} />
        </div>
    )
}