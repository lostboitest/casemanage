import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import SearchPage from "@/pages/search-page";
import CaseDetails from "@/pages/case-details";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/dashboard";
import CaseForm from "@/pages/admin/case-form";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SearchPage} />
      <Route path="/case/:caseNumber" component={CaseDetails} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/case/new" component={CaseForm} />
      <ProtectedRoute path="/admin/case/:id/edit" component={CaseForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
