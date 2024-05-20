import Carousel from "../Carousel";
import HomeChat from "../HomeChat";

export default function HomePage(): JSX.Element {
  return (
    <div className="flex h-full min-w-[800px]">
      <Carousel />
      <HomeChat />
    </div>
  );
}
