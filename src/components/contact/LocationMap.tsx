
export const LocationMap = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Visit Our Showroom</h2>
          <p className="text-gray-600">
            Experience our pianos in person at our Edmonton location.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-[4/3] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.535520344056!2d-113.6159208!3d53.54820719999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0211f525e6cfb%3A0x65e66040e8f5b549!2sPiano%20Centre%20Edmonton!5e0!3m2!1sen!2sca!4v1750179548763!5m2!1sen!2sca"
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Piano Centre Edmonton Location"
            />
          </div>
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">10460 - 170th St.</p>
            <p className="text-gray-600">Edmonton, Alberta T5S1M4</p>
          </div>
        </div>
      </div>
    </section>
  );
};
