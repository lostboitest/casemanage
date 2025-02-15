import { useState, useEffect } from "react";
import { ChevronUp, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function RatingSidebar() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          onClick={() => setShowRating(true)}
        >
          <ChevronUp className="h-4 w-4 transform -rotate-90" />
          Rate This Page
        </Button>
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRating} onOpenChange={setShowRating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setShowRating(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center gap-4">
              <img 
                src="/doj-logo.svg" 
                alt="DOJ Logo" 
                className="w-16 h-16"
              />
              <div className="text-left">
                <div className="text-sm font-semibold">U.S. DEPARTMENT OF JUSTICE</div>
                <DialogTitle className="text-lg">OFFICE OF JUSTICE PROGRAMS</DialogTitle>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Thank you for visiting.</h2>
              <p className="text-sm text-muted-foreground">
                We'd love to hear your feedback.
              </p>
              <div className="text-sm font-medium">Please rate your experience on this page: *</div>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className={`hover:bg-transparent ${rating >= star ? 'text-[#FFC107]' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  >
                    <Star className="h-8 w-8 fill-current" />
                  </Button>
                ))}
              </div>
              <Button 
                className="w-full bg-[#1E4F91] hover:bg-[#1E4F91]/90"
                onClick={() => {
                  // TODO: Implement submission logic
                  setShowRating(false);
                  setRating(0);
                }}
              >
                Submit
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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