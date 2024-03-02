export function InputBox({ label, placeholder, name, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                type={name === "password" ? "password" : "text"}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                autoComplete="off"
            />
        </div>
    );
}