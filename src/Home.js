import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import { useProductHook } from "./context/ProductProvider";

function Home() {
  const { state } = useProductHook();

  const data = {
    name: "Fasih Store",
  };
  return (
    <>
      <HeroSection data={data} />
      <Services />
      <Trusted />
    </>
  );
}

export default Home;
