import MainLayout from "../layout/MainLayout";
import PictureScreen from "../pages/pictures/PictureScreen";
import LoginScreen from "../pages/userManagement/LoginScreen";
import RegisterScreen from "../pages/userManagement/RegisterScreen";
import { routes } from "./paths";

export const routeElements = [
  // HOME
  {
    path: routes.ROUTE_MAIN,
    element: <MainLayout children={<></>} />,
  },
  {
    path: routes.ROUTE_LOGIN,
    element: <MainLayout children={<LoginScreen />} />,
  },
  {
    path: routes.ROUTE_REGISTER,
    element: <MainLayout children={<RegisterScreen />} />,
  },
  // PICTURES
  {
    path: routes.ROUTE_PICTURES,
    element: <MainLayout children={<PictureScreen />} />,
  },
];
