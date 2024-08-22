import MainLayout from "../layout/MainLayout";
import PictureScreen from "../pages/pictures/PictureScreen";
import ChangePlanScreen from "../pages/userManagement/ChangePlanScreen";
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
  {
    path: routes.ROUTE_CHANGE_PLAN,
    element: <MainLayout children={<ChangePlanScreen />} />,
  },
  // PICTURES
  {
    path: `${routes.ROUTE_PICTURES}/:dynamicParam?`,
    element: <MainLayout children={<PictureScreen />} />,
  },
];
