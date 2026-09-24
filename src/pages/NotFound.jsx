import { Link } from "react-router-dom";

// Shown for any address that does not exist, e.g. /banana
const NotFound = () => (
    <main className="container-page py-20">
        <div className="mx-auto max-w-lg text-center">
            <p className="text-7xl font-extrabold text-brand-600">404</p>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
            <p className="mt-3 text-gray-500">
                The page you are looking for does not exist, or it has been moved.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/" className="btn btn-primary px-8">
                    Go to home
                </Link>
                <Link to="/shop" className="btn btn-outline px-8">
                    Browse products
                </Link>
            </div>
        </div>
    </main>
);

export default NotFound;