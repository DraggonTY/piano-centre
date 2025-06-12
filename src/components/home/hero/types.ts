
import { z } from "zod";

export const heroContentSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  tagline: z.string().min(1, "Tagline is required"),
  viewCollectionText: z.string().min(1, "Button text is required"),
  viewCollectionLink: z.string().min(1, "Button link is required"),
  scheduleVisitText: z.string().min(1, "Button text is required"),
  scheduleVisitLink: z.string().min(1, "Button link is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
});

export type HeroContent = z.infer<typeof heroContentSchema>;

export const defaultHeroContent: HeroContent = {
  title: "Discover Your Perfect Piano",
  subtitle: "Experience our curated selection of world-class pianos, each crafted to perfection and ready to bring music to your home.",
  tagline: "Excellence in Music Since 1980",
  viewCollectionText: "View Collection",
  viewCollectionLink: "/pianos",
  scheduleVisitText: "Schedule a Visit",
  scheduleVisitLink: "/contact",
  imageUrl: "/lovable-uploads/0ac4679a-cee5-408f-a113-3252ab86e84b.png",
};
