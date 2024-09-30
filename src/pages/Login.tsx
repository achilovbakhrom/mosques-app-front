import { Alert, Button, Card, Flex, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuthStore from "../stores/authStore";

function Login() {
  const { loading, error, login } = useAuthStore();

  return (
    <Flex className="w-full h-[100vh]" justify="center" align="center">
      <Card className="min-w-[400px] shadow-sm">
        <Flex vertical gap={15}>
          <Typography className="text-[22px] font-bold text-center">
            Авторизация
          </Typography>
          {error && !loading && <Alert type="error" message={error} />}
          <Form onFinish={login}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Фойдаланувчи номини киритинг!" },
              ]}
            >
              <Input placeholder="Логин" addonBefore={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Парольни киритинг!" }]}
            >
              <Input.Password
                placeholder="Пароль"
                addonBefore={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="center" className="mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                >
                  Кириш
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
}

export default Login;
