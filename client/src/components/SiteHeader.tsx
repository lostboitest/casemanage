import { Info } from "lucide-react";
import { OfficialBanner } from "./OfficialBanner";

export function SiteHeader() {
  return (
    <div className="w-full">
      <OfficialBanner />

      {/* Main Header */}
      <header className="bg-[#1a4480] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="https://www.ojp.gov/themes/custom/ojp/assets/images/ojp-seal.png"
                alt="Department of Justice seal"
                className="w-24 h-24"
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide uppercase mb-1">U.S. DEPARTMENT OF JUSTICE</div>
              <h1 className="text-3xl font-bold tracking-wide mb-2">OFFICE OF JUSTICE PROGRAMS</h1>
              <p className="text-sm text-white/90">
                Building Solutions | Supporting Communities | Advancing Justice
              </p>
            </div>
          </div>
        </div>
      </header>

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
    </div>
  );
}