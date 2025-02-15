import { useState, useEffect } from "react";
import { ChevronUp, ChevronLeft } from "lucide-react";
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
      <div className="fixed left-0 bottom-0 z-[100]">
        <Button
          variant="default"
          size="sm"
          className="bg-[#005EA2] hover:bg-[#005EA2]/90 text-white rounded-none px-4 py-6 flex items-center gap-2 shadow-md"
          onClick={() => {
            // TODO: Implement rating functionality
            alert("Rating functionality coming soon!");
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          Rate This Page
        </Button>
      </div>

      {/* Top button - Right side */}
      {showTopButton && (
        <div className="fixed right-4 bottom-8 z-[100]">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#F6C51B] hover:bg-[#F6C51B]/90 border-none text-black rounded-full w-12 h-12 shadow-md"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
}