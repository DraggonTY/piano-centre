
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Visit Our Showroom</h2>
            <p className="text-lg text-gray-600">
              Experience our collection in person and let our experts help you find the perfect piano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-600">123 Piano Street<br />Music City, MC 12345</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@pianocentre.com</p>
            </motion.div>
          </div>
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
