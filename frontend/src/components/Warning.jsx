export function Warning({ warning, linkText, onClick }) {
    return (
        <div className="flex items-center justify-center mt-4">
            <p className="text-gray-600 mr-2">{warning}</p>
            <a href="#" className="text-blue-500 hover:underline" onClick={onClick}>{linkText}</a>
        </div>
    );
}
