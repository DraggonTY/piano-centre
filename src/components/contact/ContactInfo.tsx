
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: "780-484-3170"
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@pianocentre.ca"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "10460 - 170th St.\nEdmonton, Alberta T5S1M4"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Monday - Saturday\n9:30AM - 5:30PM"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

      <div className="space-y-4">
        {contactDetails.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
