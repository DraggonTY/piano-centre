
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: "780-484-3170",
      link: "tel:780-484-3170",
      isClickable: true
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@pianocentre.ca",
      link: "mailto:contact@pianocentre.ca",
      isClickable: true
    },
    {
      icon: MapPin,
      title: "Address",
      details: "10460 - 170th St.\nEdmonton, Alberta T5S1M4",
      link: "https://maps.google.com/?q=10460+170th+St,+Edmonton,+Alberta+T5S1M4",
      isClickable: true
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Monday - Saturday\n9:30AM - 5:30PM",
      link: "",
      isClickable: false
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
                {item.isClickable ? (
                  <a 
                    href={item.link}
                    className="text-gray-700 whitespace-pre-line hover:text-primary transition-colors duration-200 cursor-pointer"
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.details}
                  </a>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
