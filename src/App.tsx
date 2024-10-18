import Login from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Page404 from "./pages/Page404";
import Page403 from "./pages/Page403";
import Page500 from "./pages/Page500";
import { AUTH_PATH } from "./constant/path";
import Main from "./pages/Main";
import PlacePage from "./pages/Place";
import RecordPage from "./pages/Records";
import Navigation from "./pages/Navigation";
import ReportPage from "./pages/Report";
import HierarchicalReportPage from "./pages/HierarchicallyReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "",
        index: true,
        element: <Navigate to="/app" />,
      },
      {
        path: AUTH_PATH,
        element: <Login />,
      },
      {
        path: "/app",
        element: <Main />,
        index: true,
      },
      {
        path: "/app/place",
        element: <PlacePage />,
      },
      {
        path: "/app/place/top-level-report/:id",
        element: <HierarchicalReportPage />,
      },
      {
        path: "/app/record/:id",
        element: <RecordPage />,
      },
      {
        path: "/app/report/:id",
        element: <ReportPage />,
      },
      {
        path: "/errors/404",
        element: <Page404 />,
      },
      {
        path: "/errors/403",
        element: <Page403 />,
      },
      {
        path: "/errors/500",
        element: <Page500 />,
      },
      {
        path: "*",
        element: <Navigate to="/errors/404" />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
