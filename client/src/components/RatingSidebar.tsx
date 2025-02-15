import { useState } from "react";
import { Star, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RatingSidebar() {
  const [showButtons, setShowButtons] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hide buttons when near the footer
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = 300; // Approximate footer height
    const showThreshold = documentHeight - windowHeight - footerHeight;

    setShowButtons(scrollY < showThreshold);
  };

  // Add scroll event listener
  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButtons) return null;

  return (
    <>
      {/* Rate this page button - Left side */}
      <div className="fixed left-0 bottom-20 p-2 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-100 border-gray-200"
          onClick={() => {
            // TODO: Implement rating functionality
            alert("Rating functionality coming soon!");
          }}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>

      {/* Top button - Right side */}
      <div className="fixed right-0 bottom-20 p-2 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-100 border-gray-200"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}