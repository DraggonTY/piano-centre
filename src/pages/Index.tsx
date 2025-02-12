
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();

  const { data: featuredPianos, isLoading } = useQuery({
    queryKey: ['pianos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pianos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching pianos",
          description: error.message,
        });
        throw error;
      }
      
      return data as Piano[];
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" 
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1505248207594-9f9912dda70a?auto=format&fit=crop&q=80')",
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundAttachment: "fixed"
             }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 text-center px-4"
        >
          <span className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            Excellence in Music Since 1980
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Discover Your Perfect Piano
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Experience our curated selection of world-class pianos, each crafted to perfection
            and ready to bring music to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pianos">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                View Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Featured Pianos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From classic grand pianos to modern digital instruments, discover our
              carefully selected collection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                  <div className="aspect-[4/3] mb-4 bg-gray-200 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : featuredPianos?.map((piano) => (
              <motion.div
                key={piano.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
              >
                {piano.image_url && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={piano.image_url} 
                      alt={piano.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{piano.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{piano.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${piano.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">{piano.condition}</span>
                  </div>
                  <Link to={`/pianos`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/pianos">
              <Button variant="outline" size="lg">
                View All Pianos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Explore Our Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect piano for your needs, from grand pianos to digital instruments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "New Pianos",
                description: "Experience the pristine sound and touch of our new piano collection.",
                image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
                link: "/pianos?category=new"
              },
              {
                title: "Used Pianos",
                description: "Discover our selection of carefully maintained pre-owned pianos.",
                image: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80",
                link: "/pianos?category=used"
              },
              {
                title: "Digital Pianos",
                description: "Explore our range of advanced digital pianos with modern features.",
                image: "https://images.unsplash.com/photo-1595069906974-f8ae7ffc3e7a?auto=format&fit=crop&q=80",
                link: "/pianos?category=digital"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"
                  />
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-200 mb-4">{category.description}</p>
                  <Link to={category.link}>
                    <Button variant="secondary" className="w-full">
                      Explore {category.title}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
    </div>
  );
};

export default Index;
