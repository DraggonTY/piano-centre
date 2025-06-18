
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
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
    image: "/lovable-uploads/64e0759b-e5dc-4b26-bcfa-e3e0235a96f1.png",
    link: "/pianos?category=digital"
  }
];

export const CategorySection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect piano for your needs, from grand pianos to digital instruments.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-lg shadow-lg w-full"
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
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-20">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">{category.title}</h3>
                <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 drop-shadow-md">{category.description}</p>
                <Link to={category.link}>
                  <Button variant="secondary" className="w-full drop-shadow-md text-sm sm:text-base">
                    Explore {category.title}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
