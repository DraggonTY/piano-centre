
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      description: "Call us during business hours"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@pianocentre.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Piano Street\nMusic City, MC 12345",
      description: "Visit our showroom"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM\nSun: Closed",
      description: "We're here to help"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Our experienced team is ready to help you find the perfect piano or answer 
          any questions about our services. Don't hesitate to reach out!
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-800 font-medium whitespace-pre-line">
                  {item.details}
                </p>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-primary/5 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Why Choose Piano Centre Edmonton?</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Over 20 years of piano expertise</li>
          <li>• Professional tuning and repair services</li>
          <li>• Wide selection of new and pre-owned pianos</li>
          <li>• Competitive pricing and financing options</li>
          <li>• Personalized customer service</li>
        </ul>
      </div>
    </div>
  );
};
