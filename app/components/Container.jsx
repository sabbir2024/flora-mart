export default function Container({ children }) {
    return (
        <div className="container  w-full mx-auto lg:px-4">
            {children}
        </div>
    );
}