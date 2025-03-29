import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useLocalStorageState } from "ahooks";
import { login } from "../services/api";
import type { UserAuthRequest } from "../types/api";

const Login = () => {
  const navigate = useNavigate();
  // const [, setToken] = useLocalStorageState<string>("token");

  const handleSubmit = async (values: UserAuthRequest) => {
    try {
      const res = await login(values);
      if (res.status === 200) {
        // setToken(res.data.user_name);
        message.success("登录成功");
        navigate("/tasks");
      } else {
        message.error(res.msg || "登录失败");
      }
    } catch (error: any) {
      message.error(error?.msg || "登录失败");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="登录" className="w-[400px]">
        <Form
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="user_name"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              还没有账号？立即注册
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
