import { Info } from "lucide-react";
import { OfficialBanner } from "./OfficialBanner";

export function SiteHeader() {
  return (
    <div className="w-full">
      <OfficialBanner />

      {/* Official Notice Banner */}
      <div className="bg-yellow-50 border-b border-yellow-100 p-4">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <Info className="h-5 w-5 text-yellow-700 mt-0.5" />
          <div className="text-sm text-yellow-700">
            <p className="font-semibold mb-1">Notice:</p>
            <p className="italic">
              The Department of Justice's Office of Justice Programs is currently reviewing its websites
              and materials in accordance with recent Executive Orders and related guidance. During this
              review, some pages and publications will be unavailable. We apologize for any
              inconvenience this may cause.
            </p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#1a4480] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <img
              src="/doj-seal.svg"
              alt="Department of Justice seal"
              className="w-20 h-20"
            />
            <div>
              <div className="text-sm font-medium tracking-wider">U.S. DEPARTMENT OF JUSTICE</div>
              <h1 className="text-3xl font-bold tracking-wide">OFFICE OF JUSTICE PROGRAMS</h1>
              <p className="text-sm text-white/90 mt-2">
                Building Solutions | Supporting Communities | Advancing Justice
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}