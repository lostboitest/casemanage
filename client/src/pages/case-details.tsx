import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import type { Case } from "@shared/schema";

export default function CaseDetails() {
  const { caseNumber } = useParams();
  const [, setLocation] = useLocation();

  const { data: caseData, isLoading } = useQuery<Case>({
    queryKey: [`/api/cases/search?caseNumber=${caseNumber}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen p-4">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-destructive mb-4">Case Not Found</h2>
            <p className="text-muted-foreground mb-4">
              No case was found with the number: {caseNumber}
            </p>
            <Button onClick={() => setLocation("/")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="space-y-8 pt-6">
          {/* Section 1: Basic Case Information */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Case #{caseData.caseNumber}</h2>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                caseData.status === "open" ? "bg-green-100 text-green-700" :
                caseData.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {caseData.status.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{caseData.title}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {caseData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">Petitioner</h4>
                <p className="text-lg">{caseData.petitioner}</p>
              </div>
              <div>
                <h4 className="font-medium text-muted-foreground mb-2">Respondent</h4>
                <p className="text-lg">{caseData.respondent}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-muted-foreground mb-2">Docketed Date</h4>
              <p className="text-lg">
                {new Date(caseData.docketedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Section 2: Court Proceedings */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Court Proceedings</h3>
            <div className="space-y-4">
              {caseData.courtProceedings.map((proceeding, index) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">
                      {new Date(proceeding.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{proceeding.description}</p>
                </div>
              ))}
              {caseData.courtProceedings.length === 0 && (
                <p className="text-muted-foreground italic">No proceedings recorded</p>
              )}
            </div>
          </div>

          {/* Section 3: Parties Involved */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Parties Involved</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {caseData.partiesInvolved.map((party, index) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{party.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Role:</span> {party.role}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Contact:</span> {party.contact}
                    </p>
                  </div>
                </div>
              ))}
              {caseData.partiesInvolved.length === 0 && (
                <p className="text-muted-foreground italic">No parties recorded</p>
              )}
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
            <span>Created: {new Date(caseData.createdAt).toLocaleDateString()}</span>
            <span>Updated: {new Date(caseData.updatedAt).toLocaleDateString()}</span>
          </div>

          <Button onClick={() => setLocation("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}