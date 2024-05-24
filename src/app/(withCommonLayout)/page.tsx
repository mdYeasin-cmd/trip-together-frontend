import Footer from "@/components/Shared/Footer/Footer";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import SearchSection from "@/components/UI/HomePage/SearchSection/SearchSection";
import TravelPostSection from "@/components/UI/HomePage/TravelPostSection/TravelPostSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />

      <TravelPostSection />

      <Footer />
    </>
  );
}
