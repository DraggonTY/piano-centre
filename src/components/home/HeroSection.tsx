
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <img 
        src="/lovable-uploads/0ac4679a-cee5-408f-a113-3252ab86e84b.png"
        alt="Piano showroom"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ maxWidth: 'none' }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white space-y-6 px-4"
        >
          <span className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            Excellence in Music Since 1980
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            Discover Your Perfect Piano
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Experience our curated selection of world-class pianos, each crafted to perfection
            and ready to bring music to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/pianos">
              <Button 
                size="lg" 
                className="border-2 border-white bg-white text-black hover:bg-black hover:border-black hover:text-white transition-colors px-8"
              >
                View Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white text-black hover:bg-black hover:border-black hover:text-white transition-colors"
              >
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </section>
  );
};
