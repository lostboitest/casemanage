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
          className="bg-[#005EA2] hover:bg-[#005EA2]/90 text-white rounded-none px-3 py-8 flex items-center gap-1 shadow-md writing-mode-vertical text-sm font-medium"
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
            className="bg-[#F6C51B] hover:bg-[#F6C51B]/90 border-none text-black rounded-full w-14 h-16 shadow-md flex flex-col items-center justify-center gap-1 p-0"
            onClick={scrollToTop}
          >
            <div className="bg-white rounded-full p-2 shadow-sm">
              <ChevronUp className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-medium mt-1">Top</span>
          </Button>
        </div>
      )}
    </>
  );
}