
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Example Site</h1>
        <p className="text-lg text-gray-600 mb-6">
          This is an example site - not all pages are created as they would be in the final product.
        </p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline text-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
