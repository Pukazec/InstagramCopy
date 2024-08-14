import {
  AppstoreOutlined,
  LoginOutlined,
  MailOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/paths";

interface Props {
  children: ReactElement;
}

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const navigate = useNavigate();

  const items: ItemType<MenuItemType>[] | undefined = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
      onClick: () => navigate(routes.ROUTE_PICTURES, { replace: true }),
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
    },
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
    },
    {
      label: "Change plan",
      key: "changePlan",
      onClick: () => navigate(routes.ROUTE_CHANGE_PLAN, { replace: true }),
    },
  ];

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
        items={items}
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
