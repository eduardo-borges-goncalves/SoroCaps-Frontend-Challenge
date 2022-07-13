import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Divider, Form, Input } from 'antd';
import "./styles.css"

export const Login = () => {
  const [erro, setErro] = useState('')
  const { login } = useLogin()

  const onFinish = async (values: any) => {
    const erro = await login(values.username, values.password)
    setErro(erro)
  };

  return (
    <div className="container">
      <Form
        onChange={() => setErro('')}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values)}
      >
        <div className='divider-login'>
          <Divider orientation="center">
            Login
          </Divider>
        </div>
        <Form.Item
          name="username"
          rules={[{
            required: true,
            message: 'Por favor insira seu username',
            min: 3
          }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Senha deve ter no mínimo 8 caracteres',
            min: 8
          }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password" />

        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/">
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        {
          erro && <Alert
            description={erro}
            type="error"
            showIcon
          />}
      </Form>
    </div>
  );
};

