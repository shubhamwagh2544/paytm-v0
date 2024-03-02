export function Heading({ heading, subheading }) {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{heading}</h2>
            <p className="text-lg text-gray-600">{subheading}</p>
        </div>
    );
}