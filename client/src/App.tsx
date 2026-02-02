import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Strategy from "@/pages/Strategy";
import BTSOffer from "@/pages/BTSOffer";
import Resources from "@/pages/Resources";
import ResourcePost from "@/pages/ResourcePost";
import Audit from "@/pages/Audit";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/bts" component={BTSOffer} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:slug" component={ResourcePost} />
      <Route path="/audit" component={Audit} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="memetik-theme">
        <TooltipProvider>
          <div className="noise-overlay" />
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
