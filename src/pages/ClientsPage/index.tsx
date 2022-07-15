import { Alert, Button, Form, Input, Typography } from "antd"
import { useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

export const ClientsPage = () => {
  const [erro, setErro] = useState('')
  const [newClient, setNewClient] = useState(false)

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const response = await apiClient.post("/clients", {
        companyName: values.companyName,
        cnpj: values.cnpj,
        address: values.address
      })
      response && setNewClient(true)
      setTimeout(() => navigate('/'), 1000)
    } catch (error:any) {
      if (error.response.status === 409)
        setErro(error.response.data)
      else setErro("Erro ao cadastrar cliente. Por favor, tente novamente mais tarde.")
    }
  }

  const { Title } = Typography;
  return (
    <>
      <div className="container2">
        {
          newClient &&
          <div className="alert-success">
            <Alert
              description="Novo Cliente cadastrado com sucesso!"
              type="success"
              showIcon
            />
          </div>
        }
        <Typography>
          <Title> Cadastrar Cliente </Title>
        </Typography>
        <Form
          onChange={() => setErro('')}
          className="form"
          initialValues={{ remember: true }}
          onFinish={(values) => onFinish(values)}
        >
          <Form.Item
            name="companyName"
            rules={[{
              required: true,
              message: 'Por favor insira o nome da empresa',
              min: 2
            }]}
          >
            <Input placeholder="Nome da Empresa" />
          </Form.Item>
          <Form.Item
            name="cnpj"
            rules={[{
              required: true,
              message: 'CNPJ deve ter 14 números',
              min: 14,
              max: 14
            }]}
          >
            <Input type="number" placeholder="CNPJ" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{
              required: true,
              message: 'Por favor insira um endereço',
              min: 8
            }]}
          >
            <Input placeholder="Endereço" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Cadastrar
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
    </>
  )
}