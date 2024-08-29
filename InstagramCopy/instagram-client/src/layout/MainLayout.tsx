import {
  ContainerOutlined,
  LoginOutlined,
  LogoutOutlined,
  PictureOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLES_LOCAL_STORAGE_KEY } from "../config/cacheConstants";
import { useAuthContext } from "../context/AuthContext";
import { routes } from "../routes/paths";

interface Props {
  children: ReactElement;
}

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { accessToken, username, logout } = useAuthContext();
  const [navigation, setNavigation] = useState<
    ItemType<MenuItemType>[] | undefined
  >();

  const renderNavigation = () => {
    const navigationItems = [
      {
        label: "Pictures",
        key: "picture",
        icon: <PictureOutlined />,
        onClick: () => navigate(routes.ROUTE_PICTURES, { replace: true }),
      },
      {
        label: "User pictures",
        key: "userPictures",
        icon: <PictureOutlined />,
        onClick: () =>
          navigate(`${routes.ROUTE_PICTURES}/user=${username}`, {
            replace: true,
          }),
      },
    ];

    const userRoles = localStorage.getItem(USER_ROLES_LOCAL_STORAGE_KEY);
    if (userRoles && userRoles.includes("Administrator")) {
      navigationItems.push(
        {
          label: "User management",
          key: "userManagement",
          icon: <SettingOutlined />,
          onClick: () =>
            navigate(routes.ROUTE_USER_MANAGEMENT, { replace: true }),
        },
        {
          label: "Log",
          key: "instagramLog",
          icon: <ContainerOutlined />,
          onClick: () =>
            navigate(routes.ROUTE_INSTAGRAM_LOG, { replace: true }),
        }
      );
    }

    if (accessToken) {
      navigationItems.push(
        {
          label: username ?? "Change plan",
          key: "changePlan",
          icon: <UserOutlined />,
          onClick: () => navigate(routes.ROUTE_CHANGE_PLAN, { replace: true }),
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: () => logout(),
        }
      );
    } else {
      navigationItems.push(
        {
          label: "Register",
          key: "register",
          icon: <UserAddOutlined />,
          onClick: () => navigate(routes.ROUTE_REGISTER, { replace: true }),
        },
        {
          label: "Login",
          key: "login",
          icon: <LoginOutlined />,
          onClick: () => navigate(routes.ROUTE_LOGIN, { replace: true }),
        }
      );
    }

    setNavigation(navigationItems);
  };

  useEffect(() => {
    renderNavigation();
  }, [accessToken]);

  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={navigation}
        style={{ flex: 1, minWidth: 0, width: "100%", maxHeight: "3.5em" }}
      />
      <Content style={{ padding: "0 10px" }}>
        <div
          style={{
            height: "100%",
            padding: 24,
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
