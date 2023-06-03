import AppCard from "@/components/ui/AppCard";
import { HomePageData } from "@/data/HomePageData";

const HomePage = () => {
  const { apps } = HomePageData;
  return (
    <section className="w-full flex flex-wrap m-12 gap-8">
      {apps.map((data, index) => (
        <AppCard props={data} key={index} />
      ))}
    </section>
  );
};

export default HomePage;
