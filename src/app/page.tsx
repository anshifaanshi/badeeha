
import HeroSection from './HeroSection'
import Navbar from './components/Navbar';
import MouseFogEffect from './components/MouseFogEffect';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MouseFogEffect/>
      <Navbar/>
    <HeroSection/>
    </div>
  );
}
