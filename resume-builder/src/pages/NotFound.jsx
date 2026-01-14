// pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-600">Page not found</p>

      <Link
        to="/"
        className="text-blue-500 hover:underline"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
