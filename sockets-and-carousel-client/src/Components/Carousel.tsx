import { useState, useRef } from "react";

// Бесконечная карусель (слайдер) с изображениеями
export default function Carousel(): JSX.Element {
  const initSlugs = [
    "unsplash_7AcMUSYRZpU.png",
    "unsplash_Cx949d6dIFI.png",
    "unsplash_dC-z4r8tr6U.png",
    "unsplash_DpphPG9ENsI.png",
    "unsplash_mpw37yXc_WQ.png",
    "unsplash_NoRsyXmHGpI.png",
    "unsplash_W5XTTLpk1-I.png",
  ];

  const [slugs, setSlags] = useState<string[]>(initSlugs);

  // eslint-disable-next-line
  let [shiftCount, setShiftCount] = useState<number>(0);

  const imgContainerRef = useRef<HTMLDivElement | null>(null);

  function handlePrevClick() {
    if (initSlugs.length <= 2) return;

    if (shiftCount === 0) {
      const bufferSlugs = [...slugs];
      const lastSlug = bufferSlugs.pop();
      bufferSlugs.unshift(lastSlug!);
      setSlags(bufferSlugs);
    } else {
      setShiftCount(--shiftCount);
      imgContainerRef.current!.style.marginLeft = -1000 * shiftCount + "px";
    }
  }

  function handleNextClick() {
    if (initSlugs.length <= 2) return;

    if (shiftCount === initSlugs.length - 2) {
      const bufferSlugs = [...slugs];
      const firstSlug = bufferSlugs.shift();
      bufferSlugs.push(firstSlug!);

      setSlags(bufferSlugs);

      imgContainerRef.current!.style.marginLeft =
        -1000 * (initSlugs.length - 2) + "px";
      setShiftCount(initSlugs.length - 2);
    } else {
      setShiftCount(++shiftCount);
      imgContainerRef.current!.style.marginLeft = -1000 * shiftCount + "px";
    }
  }

  return (
    <div className="home-carousel-container">
      <div className="carousel-images-container" ref={imgContainerRef}>
        {slugs.map((slug) => (
          <div
            key={slug}
            className="h-full max-w-[1000px] min-w-[1000px] bg-cover"
            style={{ backgroundImage: `url(http://localhost:3000/${slug})` }}
          />
        ))}
      </div>
      <button
        className="arrow arrow-left"
        onClick={() => {
          handlePrevClick();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10L15 10M5 10L10.303 5M5 10L10.303 15"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="arrow arrow-right"
        onClick={() => {
          handleNextClick();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10L5 10M15 10L9.69697 5M15 10L9.69697 15"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
