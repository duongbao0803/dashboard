import {
    HomeFilled,
    UserOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LogoWeb from "../assets/image/FPT_Software_Logo.png";
import { useAuth } from "../context/AuthProvider";

const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}
const items = [
  getItem("Nhân viên", "1", <UserOutlined />, undefined, "/employee"),
  getItem("Phòng ban", "2", <HomeFilled />, undefined, "/department"),
];

const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys : ["1"];
  };

  const defaultSelectedKeys = resetDefaultSelectedKeys();

const storeDefaultSelectedKeys = (key) => {
  sessionStorage.setItem("keys", key);
};

const renderMenuItems = (items) => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => storeDefaultSelectedKeys([item.key])}
        >
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    }
  });
};

const AppLayout = ({children}) => {

    const { logout, user, isAuthenticated } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <div className="my-7 flex justify-center">
          <img
            className="w-7/12 select-none object-cover"
            src={LogoWeb}
            alt=""
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <div className="header w-[-webkit-fill-available] pr-4 flex justify-end gap-2 items-center fixed z-[1000] h-16 backdrop-blur-[5px] bg-[#f5f5f58a] transition-all duration-700 ease-in-out">
          <img
            src={LogoWeb}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-[50%] border object-cover"
          />

          <div className="flex flex-col">
            {isAuthenticated ? <strong>{"Admin"}</strong> : ""}
            <div
              className="text-[#5099ff] hover:underline cursor-pointer"
            //   onClick={handleLogout}
            >
              Đăng xuất
            </div>
          </div>
        </div>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          FPT Software ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
