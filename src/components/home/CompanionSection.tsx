
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const CompanionSection = () => {
  const videoUrl = "https://hkyldwsgagbkrshqfawi.supabase.co/storage/v1/object/public/video/test.mov";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out at 34 seconds after component mounts
    const fadeOutTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 34000);

    // Fade back in at 36 seconds (assuming video restarts around this time)
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 36000);

    // Set up repeating cycle every 36 seconds (adjust to match your video duration)
    const interval = setInterval(() => {
      // Fade out 2 seconds before video ends
      setTimeout(() => setIsVisible(false), 34000);
      // Fade back in when video restarts
      setTimeout(() => setIsVisible(true), 2000);
    }, 36000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(fadeInTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Fallback to image if video fails to load */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/lovable-uploads/faeb1a0b-1284-43e1-95fe-a51e7ca101a3.png')"
            }}
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            transition: { duration: 1 }
          }}
          className="text-center text-white space-y-6"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            The Ultimate Companion & Music Entertainment at home
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enjoy a beautiful grand piano at home and have it come to life via iPad.
          </p>
          <div className="pt-4">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 text-base font-medium tracking-wider"
              >
                LEARN MORE
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
