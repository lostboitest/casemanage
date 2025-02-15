import { Info, Settings, LogOut } from "lucide-react";
import { OfficialBanner } from "./OfficialBanner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="w-full">
      <OfficialBanner />

      {/* Main Header */}
      <header className="bg-[#1a4480] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 150 150" className="w-24 h-24">
                  {/* DOJ Eagle Circle */}
                  <circle cx="75" cy="75" r="70" fill="#ffffff"/>
                  <circle cx="75" cy="75" r="65" fill="#1a4480"/>
                  <circle cx="75" cy="75" r="60" fill="#ffffff"/>

                  {/* DOJ Eagle */}
                  <path fill="#1a4480" d="M75 25C45 25 25 45 25 75C25 105 45 125 75 125C105 125 125 105 125 75C125 45 105 25 75 25zM75 115C50 115 35 100 35 75C35 50 50 35 75 35C100 35 115 50 115 75C115 100 100 115 75 115z"/>

                  {/* Stars */}
                  <g fill="#1a4480">
                    <circle cx="75" cy="45" r="3"/>
                    <circle cx="105" cy="75" r="3"/>
                    <circle cx="75" cy="105" r="3"/>
                    <circle cx="45" cy="75" r="3"/>
                  </g>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide uppercase mb-1">U.S. DEPARTMENT OF JUSTICE</div>
                <h1 className="text-3xl font-bold tracking-wide mb-2">OFFICE OF JUSTICE PROGRAMS</h1>
                <p className="text-sm text-white/90">
                  Building Solutions | Supporting Communities | Advancing Justice
                </p>
              </div>
            </div>

            {/* User Menu */}
            {user && (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <Settings className="h-5 w-5 text-white" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href="/admin/profile">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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