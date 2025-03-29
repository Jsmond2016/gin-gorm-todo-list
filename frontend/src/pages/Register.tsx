import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { register } from "@services/api";
import type { UserAuthRequest } from "../types/api";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: UserAuthRequest) => {
    try {
      const res = await register(values);
      if (res.status === 200) {
        message.success("注册成功");
        navigate("/login");
      } else {
        message.error(res.msg || "注册失败");
      }
    } catch (error: any) {
      message.error(error?.msg || "注册失败");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="注册" className="w-[400px]">
        <Form
          name="register"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="user_name"
            rules={[
              { required: true, message: "请输入用户名" },
              { min: 3, message: "用户名至少3个字符" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              { min: 6, message: "密码至少6个字符" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              已有账号？立即登录
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
