import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedPaintings } from "@/components/FeaturedPaintings";
import { FeaturedBlogPosts } from "@/components/FeaturedBlogPosts";
import { AboutPreview } from "@/components/AboutPreview";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedPaintings />
      <FeaturedBlogPosts />
      <AboutPreview />
      <Footer />
    </div>
  );
}
