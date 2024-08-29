import MainLayout from "../layout/MainLayout";
import InstagramLogScreen from "../pages/instagramLog/InstagramLogScreen";
import PictureScreen from "../pages/pictures/PictureScreen";
import ChangePlanScreen from "../pages/userManagement/ChangePlanScreen";
import LoginScreen from "../pages/userManagement/LoginScreen";
import RegisterScreen from "../pages/userManagement/RegisterScreen";
import UserManagementScreen from "../pages/userManagement/UserManagementScreen";
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
  // USER MANAGEMENT
  {
    path: routes.ROUTE_CHANGE_PLAN,
    element: <MainLayout children={<ChangePlanScreen />} />,
  },
  {
    path: routes.ROUTE_USER_MANAGEMENT,
    element: <MainLayout children={<UserManagementScreen />} />,
  },
  // LOG
  {
    path: routes.ROUTE_INSTAGRAM_LOG,
    element: <MainLayout children={<InstagramLogScreen />} />,
  },
  // PICTURES
  {
    path: `${routes.ROUTE_PICTURES}/:dynamicParam?`,
    element: <MainLayout children={<PictureScreen />} />,
  },
];
