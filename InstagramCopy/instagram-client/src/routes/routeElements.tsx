import MainLayout from "../layout/MainLayout";
import PictureScreen from "../pages/pictures/PictureScreen";
import { routes } from "./paths";

export const routeElements = [
  // HOME
  {
    path: routes.ROUTE_MAIN,
    element: <MainLayout children={<></>} />,
  },
  // PICTURES
  {
    path: routes.ROUTE_PICTURES,
    element: <MainLayout children={<PictureScreen />} />,
  },
];
