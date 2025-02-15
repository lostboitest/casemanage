import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LogIn, ExternalLink } from "lucide-react";
import { Link } from "wouter";

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
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Search Card */}
          <Card className="md:col-span-2 lg:col-span-3">
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

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access the admin portal to manage cases and update records.
              </p>
              <Link href="/auth">
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
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

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
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
      </footer>
    </div>
  );
}