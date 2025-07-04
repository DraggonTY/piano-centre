
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Edit, Check, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroContent } from "./hero/types";
import { useHeroContent } from "./hero/useHeroContent";
import { HeroEditDialog } from "./hero/HeroEditDialog";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroButtons } from "./hero/HeroButtons";

export const HeroSection = () => {
  const { heroContent, isAdmin, loading, updateHeroContent } = useHeroContent();
  const [open, setOpen] = useState(false);

  return (
    <section className="hero-section relative min-h-[500px] h-[70vh] sm:h-[80vh] w-full overflow-hidden">{" "}
      <HeroBackground imageUrl={heroContent.imageUrl} />
      
      {isAdmin && (
        <div className="absolute top-24 right-4 z-20">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="bg-black hover:bg-gray-800 text-white border border-white transition-colors"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Hero Section
              </Button>
            </DialogTrigger>
            <HeroEditDialog 
              heroContent={heroContent}
              loading={loading}
              onSubmit={updateHeroContent}
              onOpenChange={setOpen}
            />
          </Dialog>
        </div>
      )}
      
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white space-y-6 px-4"
        >
          <span className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            {heroContent.tagline}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {heroContent.subtitle}
          </p>
          <HeroButtons heroContent={heroContent} />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 flex items-center justify-center"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </motion.div>
    </section>
  );
};
