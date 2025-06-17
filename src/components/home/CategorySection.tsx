
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
    image: "https://images.unsplash.com/photo-1552422535-c732c61732?auto=format&fit=crop&q=80",
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
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect piano for your needs, from grand pianos to digital instruments.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-lg shadow-lg flex-1"
            >
              <Link to={category.link} className="block">
                <div className="aspect-[16/9] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"
                  />
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{category.title}</h3>
                <p className="text-gray-200 mb-4 drop-shadow-md">{category.description}</p>
                <Link to={category.link}>
                  <Button variant="secondary" className="w-full drop-shadow-md">
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
