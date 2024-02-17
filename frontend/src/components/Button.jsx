export function Button({ name, onClick }) {
    return (
        <div>
            <button onClick={onClick} className="bg-gray-500">{name}</button>
        </div>
    )
}