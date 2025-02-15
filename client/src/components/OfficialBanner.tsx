import { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";

export function OfficialBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-gray-100 text-sm">
      {/* Main banner */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img
              src="/us_flag_small.webp"
              alt=""
              className="w-5 h-5"
            />
            <span className="font-medium">An official website of the United States government</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-800 hover:text-blue-900 flex items-center gap-1"
        >
          Here's how you know
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <img
                src="/icon-dot-gov.svg"
                alt=""
                className="w-8 h-8"
              />
              <div>
                <p className="font-bold mb-2">Official websites use .gov</p>
                <p className="text-gray-600">
                  A <strong>.gov</strong> website belongs to an official government organization in the United States.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock className="w-8 h-8" />
              <div>
                <p className="font-bold mb-2">Secure .gov websites use HTTPS</p>
                <p className="text-gray-600">
                  A <strong>lock</strong> (<Lock className="w-4 h-4 inline" />) or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}