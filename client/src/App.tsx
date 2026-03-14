import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from "react";
import strategyRouteRegistry from "@shared/strategyRouteRegistry.json";

const Home = lazy(() => import("@/pages/Home"));
const Strategy = lazy(() => import("@/pages/Strategy"));
const StrategyUleads = lazy(() => import("@/pages/StrategyUleads"));
const StrategySignifyIP = lazy(() => import("@/pages/StrategySignifyIP"));
const StrategyBTS = lazy(() => import("@/pages/StrategyBTS"));
const StrategyKinso = lazy(() => import("@/pages/strategy/Kinso"));
const StrategyBts2 = lazy(() => import("@/pages/strategy/Bts2"));
const StrategyBts3 = lazy(() => import("@/pages/strategy/Bts3"));
const StrategyDrinkhyro = lazy(() => import("@/pages/strategy/Drinkhyro"));
const StrategyHotWaterFunnel = lazy(() => import("@/pages/strategy/HotWaterFunnel"));
const StrategyCreatorArmy = lazy(() => import("@/pages/strategy/CreatorArmy"));
const StrategyXoomai = lazy(() => import("@/pages/strategy/Xoomai"));
const BTSOffer = lazy(() => import("@/pages/BTSOffer"));
const Resources = lazy(() => import("@/pages/Resources"));
const ResourceHub = lazy(() => import("@/pages/ResourceHub"));
const ResourcePost = lazy(() => import("@/pages/ResourcePost"));
const Audit = lazy(() => import("@/pages/Audit"));
const AuditReport = lazy(() => import("@/pages/AuditReport"));
const Segment = lazy(() => import("@/pages/Segment"));
const Comparison = lazy(() => import("@/pages/Comparison"));
const Solution = lazy(() => import("@/pages/Solution"));
const AEOAgency = lazy(() => import("@/pages/AEOAgency"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const Agents = lazy(() => import("@/pages/Agents"));
const TestLanding = lazy(() => import("@/pages/TestLanding"));
const NotFound = lazy(() => import("@/pages/not-found"));

const strategyPageComponents = {
  bts: StrategyBTS,
  "bts-2": StrategyBts2,
  "bts-3": StrategyBts3,
  "signify-ip": StrategySignifyIP,
  uleads: StrategyUleads,
  kinso: StrategyKinso,
  drinkhyro: StrategyDrinkhyro,
  "hot-water-funnel": StrategyHotWaterFunnel,
  "creator-army": StrategyCreatorArmy,
  xoomai: StrategyXoomai,
} as const;

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        {strategyRouteRegistry.routes.map(({ route, componentKey }) => {
          const component = strategyPageComponents[componentKey as keyof typeof strategyPageComponents];

          return <Route key={route} path={route} component={component} />;
        })}
        <Route path="/strategy" component={Strategy} />
        <Route path="/bts" component={BTSOffer} />
        <Route path="/aeo-agency" component={AEOAgency} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/case-studies" component={CaseStudiesPage} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/topics/:topic" component={ResourceHub} />
        <Route path="/resources/:slug" component={ResourcePost} />
        <Route path="/audit" component={Audit} />
        <Route path="/audit/:slug" component={AuditReport} />
        <Route path="/for/:segment" component={Segment} />
        <Route path="/vs/:comparison" component={Comparison} />
        <Route path="/solutions/:solution" component={Solution} />
        <Route path="/agents" component={Agents} />
        <Route path="/test" component={TestLanding} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
