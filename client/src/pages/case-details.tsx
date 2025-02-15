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
        <Card className="max-w-2xl mx-auto">
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Case #{caseData.caseNumber}</span>
            <span className={`text-sm ${
              caseData.status === "open" ? "text-green-500" :
              caseData.status === "pending" ? "text-yellow-500" :
              "text-red-500"
            }`}>
              {caseData.status.toUpperCase()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">{caseData.title}</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {caseData.description}
            </p>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
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
