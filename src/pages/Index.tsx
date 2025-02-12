
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Piano {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  condition: string;
  type: string;
}

const Index = () => {
  const { toast } = useToast();

  const { data: pianos, isLoading } = useQuery({
    queryKey: ['pianos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pianos')
        .select('*')
        .order('created_at', { ascending: false });
      
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
      <section className="hero-section">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0" 
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1505248207594-9f9912dda70a?auto=format&fit=crop&q=80')",
               backgroundSize: "cover",
               backgroundPosition: "center"
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
          <h1 className="heading-xl mb-6 text-white">
            Discover the Perfect Piano
          </h1>
          <p className="text-body max-w-2xl mx-auto mb-8 text-gray-100">
            Experience our curated selection of world-class pianos, each crafted to perfection
            and ready to bring music to your home.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Explore Collection
          </motion.button>
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
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Featured Pianos</h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              From classic grand pianos to modern digital instruments, discover our
              carefully selected collection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="aspect-[4/3] mb-4 bg-gray-200 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : pianos?.map((piano, i) => (
              <motion.div
                key={piano.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6 group"
              >
                <div className="aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={piano.image_url} 
                    alt={piano.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="heading-md mb-2">{piano.name}</h3>
                <p className="text-gray-600 mb-2">{piano.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">${piano.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{piano.condition}</span>
                </div>
                <button className="w-full btn-primary">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Our Heritage</h2>
              <p className="text-body text-gray-600 mb-8">
                For over four decades, we've been passionate about bringing the finest
                pianos to musicians and music lovers. Our expertise in selection,
                restoration, and service ensures that each instrument meets the highest
                standards of quality and performance.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                About Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Visit Our Showroom</h2>
              <p className="text-body text-gray-600 mb-8">
                Experience our collection in person and let our experts help you
                find the perfect piano for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Book a Consultation
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-primary rounded-full font-medium
                           transition-all duration-200 hover:bg-primary/5"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
