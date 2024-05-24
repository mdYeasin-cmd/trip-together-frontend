import Footer from "@/components/Shared/Footer/Footer";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Newsletter from "@/components/UI/HomePage/Newsletter/Newsletter";
import SearchSection from "@/components/UI/HomePage/SearchSection/SearchSection";
import TravelPostSection from "@/components/UI/HomePage/TravelPostSection/TravelPostSection";
import WhyChooseUs from "@/components/UI/HomePage/WhyChooseUs/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />

      <TravelPostSection />

      <WhyChooseUs />

      <Newsletter />

      <Footer />
    </>
  );
}
