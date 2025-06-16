
export const LocationMap = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Visit Our Showroom</h2>
          <p className="text-gray-600">
            Experience our pianos in person at our Music City location.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
          <div className="h-64 bg-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">123 Piano Street</p>
              <p className="text-gray-600">Music City, MC 12345</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
