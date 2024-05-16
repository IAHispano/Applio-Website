import Categories from "@/components/home/categories";
import VideoRecommendations from "@/components/home/recommendations";
import SearchBar from "@/components/home/search";
import TopViews from "@/components/home/topViews";
import Logo from "@/components/navbar/logo";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Logo position="top"/>
      <SearchBar />
      <TopViews />
      <Categories />
      <VideoRecommendations />
    </main>
  );
}
