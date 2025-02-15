import { useState, useEffect } from "react";
import { Star, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RatingSidebar() {
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show top button only after scrolling past resources section
  const handleScroll = () => {
    const resourcesSection = document.querySelector('#resources-section');
    if (resourcesSection) {
      const resourcesPosition = resourcesSection.getBoundingClientRect().top;
      setShowTopButton(resourcesPosition < 0);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Rate this page button - Left side */}
      <div className="fixed left-4 bottom-8 z-[100]">
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-100 border-gray-200 shadow-md"
          onClick={() => {
            // TODO: Implement rating functionality
            alert("Rating functionality coming soon!");
          }}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>

      {/* Top button - Right side */}
      {showTopButton && (
        <div className="fixed right-4 bottom-8 z-[100]">
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gray-100 border-gray-200 shadow-md"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}