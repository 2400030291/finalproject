import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { PollingStations } from "./pages/PollingStations";
import { Results } from "./pages/Results";
import { Incidents } from "./pages/Incidents";
import { Reports } from "./pages/Reports";
import { Root } from "./pages/Root";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/app",
    Component: Root,
    ErrorBoundary: ErrorPage,
    children: [
      { 
        index: true, 
        Component: Dashboard,
      },
      { 
        path: "polling-stations", 
        Component: PollingStations,
      },
      { 
        path: "results", 
        Component: Results,
      },
      { 
        path: "incidents", 
        Component: Incidents,
      },
      { 
        path: "reports", 
        Component: Reports,
      },
    ],
  },
  {
    path: "*",
    Component: LandingPage,
    ErrorBoundary: ErrorPage,
  },
]);
