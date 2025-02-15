import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";
import { RatingSidebar } from "@/components/RatingSidebar";

export default function SearchPage() {
  const [caseNumber, setCaseNumber] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (caseNumber.trim()) {
      setLocation(`/case/${caseNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <RatingSidebar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Search Card */}
          <Card className="md:col-span-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1a4480]">
                Case Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter case number..."
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-[#1a4480] hover:bg-[#1a4480]/90">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card id="resources-section">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="https://www.justice.gov/grants/resources/grant-case-filing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#1a4480] hover:text-[#1a4480]/80"
                  >
                    Case Filing Guidelines
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.ojp.gov/library/publications/document-templates" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#1a4480] hover:text-[#1a4480]/80"
                  >
                    Document Templates
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.ojp.gov/faqs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#1a4480] hover:text-[#1a4480]/80"
                  >
                    Frequently Asked Questions
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.ojp.gov/contact-us" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#1a4480] hover:text-[#1a4480]/80"
                  >
                    Contact Information
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay informed about recent changes and updates to the case management system.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer with Agency Logos */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center gap-12">
            {/* Left side - DOJ Logo and Text */}
            <div className="flex items-center gap-4">
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
              <div>
                <div className="text-sm font-semibold tracking-wide uppercase mb-1">U.S. DEPARTMENT OF JUSTICE</div>
                <h1 className="text-3xl font-bold tracking-wide mb-2">OFFICE OF JUSTICE PROGRAMS</h1>
                <p className="text-sm text-gray-600">
                  Building Solutions | Supporting Communities | Advancing Justice
                </p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-20 bg-black"></div>

            {/* Right side - Agency Logos */}
            <div className="flex flex-wrap gap-8">
              <a href="https://bja.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">BJA</text>
                </svg>
              </a>
              <a href="https://bjs.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">BJS</text>
                </svg>
              </a>
              <a href="https://nij.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">NIJ</text>
                </svg>
              </a>
              <a href="https://ojjdp.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">OJJDP</text>
                </svg>
              </a>
              <a href="https://ovc.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">OVC</text>
                </svg>
              </a>
              <a href="https://smart.ojp.gov/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="32" viewBox="0 0 96 32">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                        fill="#162e51" fontSize="24" fontWeight="bold">SMART</text>
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-center text-sm text-gray-600 mb-4">
              999 N. Capitol St., NE, Washington, DC 20531
            </div>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#1a4480]">
              <li>
                <a href="https://www.ojp.gov/accessibility" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="https://www.ojp.gov/plain-language" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Plain Language
                </a>
              </li>
              <li>
                <a href="https://www.ojp.gov/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.ojp.gov/legal-policies-and-disclaimers" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Legal Policies and Disclaimer
                </a>
              </li>
              <li>
                <a href="https://www.ojp.gov/about/no-fear-act" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  No FEAR Act
                </a>
              </li>
              <li>
                <a href="https://www.ojp.gov/freedom-information-act-foia" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Freedom of Information Act
                </a>
              </li>
              <li>
                <a href="https://www.usa.gov" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  USA.gov
                </a>
              </li>
              <li>
                <a href="https://www.justice.gov" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Justice.gov
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}