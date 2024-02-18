export function InputBox({ label, placeholder, name, onChange }) {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input type="text" placeholder={placeholder} name={name} onChange={onChange} />
        </div>
    )
}