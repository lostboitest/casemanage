import { Info } from "lucide-react";

export function SiteHeader() {
  return (
    <div className="w-full">
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
          <h1 className="text-3xl font-bold mb-2">Case Management System</h1>
          <p className="text-white/90">
            Building Solutions | Supporting Communities | Advancing Justice
          </p>
        </div>
      </header>
    </div>
  );
}
