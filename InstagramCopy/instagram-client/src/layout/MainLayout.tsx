import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
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
      onClick: () => navigate(routes.ROUTE_PICTURES),
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            { label: "Option 1", key: "setting:1" },
            { label: "Option 2", key: "setting:2" },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            { label: "Option 3", key: "setting:3" },
            { label: "Option 4", key: "setting:4" },
          ],
        },
      ],
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
        style={{ flex: 1, minWidth: 0, width: "100%" }}
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
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
