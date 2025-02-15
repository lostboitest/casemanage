import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RatingSidebar() {
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show top button after scrolling down 100px
  const handleScroll = () => {
    setShowTopButton(window.scrollY > 100);
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
          className="writing-mode-vertical flex flex-col-reverse items-center justify-between bg-[#1E4F91] hover:bg-[#1E4F91]/80 text-white rounded-none px-2 py-6 shadow-lg text-xs font-medium tracking-tight transition-colors min-h-[160px]"
          onClick={() => {
            // TODO: Implement rating functionality
            alert("Rating functionality coming soon!");
          }}
        >
          <ChevronUp className="h-4 w-4 transform -rotate-90" />
          Rate This Page
        </Button>
      </div>

      {/* Top button - Right side */}
      {showTopButton && (
        <div className="fixed right-4 bottom-8 z-[100]">
          <Button
            variant="outline"
            size="icon"
            className="bg-[#FFC107] hover:bg-[#FFC107]/80 border-none text-black rounded-full w-16 h-20 shadow-lg flex flex-col items-center justify-center gap-2 p-0 transition-colors"
            onClick={scrollToTop}
          >
            <div className="bg-white rounded-full p-2.5 shadow-md">
              <ChevronUp className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-medium">Top</span>
          </Button>
        </div>
      )}
    </>
  );
}