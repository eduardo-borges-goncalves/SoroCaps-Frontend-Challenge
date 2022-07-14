import { Alert, Button, Form, Input, Typography } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./styles.css"
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
  const [erro, setErro] = useState('')
  const [newUser, setNewUser] = useState(false)

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const response = await apiClient.post("/users", {
        name: values.name,
        userLogin: values.username,
        password: values.password
      })
      response && setNewUser(true)
      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      setErro("Erro ao criar usuário. Por favpr, tente novamente mais tarde.")
    }

  }

  const { Title } = Typography;
  return (
      <div className="container2">
       {
          newUser &&
          <div className="alert-success">
            <Alert
              description="Novo Usuário criado com sucesso!"
              type="success"
              showIcon
            />
          </div>
        }
        <Typography>
          <Title> Criar Usuário </Title>
        </Typography>
        <Form
          onChange={() => setErro('')}
          className="form"
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values)}
        >
          <Form.Item
            name="name"
            rules={[{
              required: true,
              message: 'Por favor insira o nome do usuário',
              min: 2
            }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nome" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: 'Por favor insira um username',
              min: 3
            }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: 'A senha deve ter no mínimo 8 caracteres',
              min: 8
            }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Criar
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
  )
}