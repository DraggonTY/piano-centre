
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
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
  );
};
