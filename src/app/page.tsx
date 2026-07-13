
import HeroSection from './HeroSection'
import Navbar from './components/Navbar';
import MouseFogEffect from './components/MouseFogEffect';
import ScrollServices from './hero/Service';
import StatsBar from './hero/StatsBar';
import ServicesGrid from './hero/ServiceGrid';
import AboutUs from './hero/About';
import BookingForm from './hero/BookingForm';
import Footer from './components/Footer';
import Testimonials from './hero/Testimonials';
import WhatsAppButton from './components/WhtsappButton';
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <WhatsAppButton/>
      <MouseFogEffect/>
      <Navbar/>
    <HeroSection/>
    <StatsBar/>
<Testimonials/>
    <ScrollServices/>
    <ServicesGrid/>
    <AboutUs/>
    <BookingForm/>
    <Footer/>
    </div>
  );
}
