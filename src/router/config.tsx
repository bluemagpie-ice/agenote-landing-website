import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import DevicePage from "../pages/device/page";
import FeaturesPage from "../pages/features/page";
import FaqPage from "../pages/faq/page";
import ContactPage from "../pages/contact/page";
import ApplyPage from "../pages/apply/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/device",
    element: <DevicePage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/faq",
    element: <FaqPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/apply",
    element: <ApplyPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;