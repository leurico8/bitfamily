import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import HowItWorks from "@/pages/how-it-works";
import SetupWizard from "@/pages/setup-wizard";
import Demo from "@/pages/demo";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Always start with landing page */}
      <Route path="/" component={Landing} />
      
      {/* Public routes accessible to everyone */}
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/setup-wizard" component={SetupWizard} />
      <Route path="/demo" component={Demo} />
      
      {/* Protected routes for authenticated users */}
      {!isLoading && isAuthenticated && (
        <Route path="/dashboard" component={Dashboard} />
      )}
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
