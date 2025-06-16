
export const LocationMap = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Come experience our pianos in person. Our showroom features a wide selection 
            of instruments in a comfortable, acoustic environment.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 bg-gray-300 flex items-center justify-center relative">
            {/* Placeholder for map - in a real app, you'd integrate with Google Maps or similar */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">123 Piano Street</p>
              <p className="text-gray-600">Music City, MC 12345</p>
              <p className="text-sm text-gray-500 mt-2">
                Interactive map would be integrated here
              </p>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Parking</h4>
              <p className="text-gray-600 text-sm">Free parking available in front and behind the building</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Accessibility</h4>
              <p className="text-gray-600 text-sm">Wheelchair accessible entrance and showroom</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Transit</h4>
              <p className="text-gray-600 text-sm">Bus routes 12 and 34 stop nearby</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
