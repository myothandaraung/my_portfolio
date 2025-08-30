import React, { useRef, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaStarOfLife } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function CategorySlider() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const categories = t("categories", { returnObjects: true }) || [];

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Start auto-scroll
  const startAutoScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      const { scrollWidth } = container;
      const half = scrollWidth / 3; // since we tripled the list

      // Start in the middle copy
      container.scrollLeft = half;

      const handleScroll = () => {
        if (container.scrollLeft <= 0) {
          container.scrollLeft = half;
        } else if (container.scrollLeft >= half * 2) {
          container.scrollLeft = half;
        }
      };

      container.addEventListener("scroll", handleScroll);
      startAutoScroll();

      return () => {
        container.removeEventListener("scroll", handleScroll);
        clearInterval(scrollIntervalRef.current);
      };
    }
  }, []);

  // Manual scroll
  const manualScroll = (offset) => {
    clearInterval(scrollIntervalRef.current);
    scrollContainerRef.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
    startAutoScroll();
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    clearInterval(scrollIntervalRef.current);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // drag speed
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    clearInterval(scrollIntervalRef.current);
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  return (
    <div className="relative bg-[#112240] py-4 px-4 overflow-hidden rounded-full my-8">
      <div className="container mx-auto flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={() => manualScroll(-200)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#112240] text-gray-400 p-3 rounded-full shadow-md z-10 hover:text-[#64ffda] hidden md:block"
        >
          <FaAngleLeft className="text-2xl" />
        </button>

        {/* Scrollable Categories */}
        <div
          ref={scrollContainerRef}
          className={`flex items-center space-x-6 overflow-x-auto whitespace-nowrap scroll-smooth pb-2 pt-1 px-4 md:px-0 lg:px-0 hide-scrollbar ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Tripled list for infinite loop */}
          {[...categories, ...categories, ...categories].map(
            (category, index) => (
              <React.Fragment key={`${category}-${index}`}>
                <button className="flex-shrink-0 text-white text-lg md:text-xl font-semibold px-4 py-2 rounded-full hover:text-[#64ffda] transition-colors">
                  {category}
                </button>
                {index < categories.length * 3 - 1 && (
                  <FaStarOfLife className="flex-shrink-0 text-[#64ffda] text-xs md:text-sm" />
                )}
              </React.Fragment>
            )
          )}
        </div>

        {/* Right Button */}
        <button
          onClick={() => manualScroll(200)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#112240] text-gray-400 p-3 rounded-full shadow-md z-10 hover:text-[#64ffda] hidden md:block"
        >
          <FaAngleRight className="text-2xl" />
        </button>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CategorySlider;