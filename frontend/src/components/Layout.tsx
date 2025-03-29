import { Layout as AntLayout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UnorderedListOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";

const { Header, Content, Footer } = AntLayout;

const Layout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="text-white text-xl font-bold mr-8">ToDoList</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/tasks"]}
            items={[
              {
                key: "/tasks",
                icon: <UnorderedListOutlined />,
                label: "任务列表",
                onClick: () => navigate("/tasks"),
              },
              {
                key: "create",
                icon: <PlusOutlined />,
                label: "创建任务",
                onClick: () => navigate("/task/new"),
              },
            ]}
          />
        </div>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="text-white hover:text-gray-300"
        >
          退出登录
        </Button>
      </Header>
      <Content className="p-6">
        <div
          className="bg-white p-6 min-h-[280px]"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center">
        ToDoList ©{new Date().getFullYear()} Created by Your Name
      </Footer>
    </AntLayout>
  );
};

export default Layout;
