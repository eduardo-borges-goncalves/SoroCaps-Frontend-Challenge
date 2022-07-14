import { Alert, Button, Form, Input, Select, Typography } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

const { Option } = Select;
const { Title } = Typography;

export const CreateSalesOrdersPage = () => {
  const [erro, setErro] = useState('')
  const [newSaleOrder, setNewSaleOrder] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  const [productsSales, setProductsSales] = useState([1])

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const products = productsSales.map((i, index )=> {
      return {
        codeProduct: values[`codeProduct${index}`], 
        priceSales: values[`priceSales${index}`],
        quantity: values[`quantity${index}`], 
      }
    })
    try {
      const response = await apiClient.post("/sales-orders", {
        clientId: values.clientId,
        products
      })
      response && setNewSaleOrder(true)
      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      setErro("Erro ao cadastrar produto. Por favor, tente novamente mais tarde.")
    }
  }

  const getClients = async (value: string) => {
    const response = await apiClient.get(`/clients/${value}`)
    response.data.length > 0 && setClients(response.data)
  }

  const getProducts = async (value: string) => {
    const response = await apiClient.get(`/products/${value}`)
    response.data.length > 0 && setProducts(response.data)
  }

  const debouncedClient = useDebounce(getClients, 500)
  const debouncedProduct = useDebounce(getProducts, 500)

  const onSearchClient = (value: string) => {
    debouncedClient(value)
  };

  const onSearchProduct = (value: string) => {
    debouncedProduct(value)
  };

  return (
    <div className="container2">
      {
        newSaleOrder &&
        <div className="alert-success">
          <Alert
            description="Novo Pedido de Venda cadastrado com sucesso!"
            type="success"
            showIcon
          />
        </div>
      }
      <Typography>
        <Title> Criar Pedido de Venda </Title>
      </Typography>
      <Form
        onChange={() => setErro('')}
        className="form"
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item
          name="clientId"
          rules={[{
            required: true,
            message: 'Por favor escolha um cliente',
          }]}
        >
          <Select
            showSearch
            placeholder="Cliente"
            optionFilterProp="children"
            onSearch={onSearchClient}
            filterOption={(input: any, option: any) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            } >
            {
              clients.map(client => (
                <Option value={String(client.id)} key={client.id}>
                  {client.companyName}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        {
          productsSales.map((i, index )=> (
            <>
              <Form.Item
                name={`codeProduct${index}`}
                rules={[{
                  required: true,
                  message: 'Por favor insira o nome do produto',
                }]}
              >
                <Select
                  showSearch
                  placeholder="Produto"
                  optionFilterProp="children"
                  onSearch={onSearchProduct}
                  filterOption={(input: any, option: any) =>
                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {
                    products.map(product => (
                      <Option value={String(product.codeProduct)} key={product.codeProduct}>
                        {product.name}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name={`quantity${index}`}
                rules={[{
                  required: true,
                  message: 'Por favor insira a quantidade',
                  min: 3
                }]}
              >
                <Input type="number" placeholder="Quantidade" />
              </Form.Item>
              <Form.Item
                name={`priceSales${index}`}
                rules={[{
                  required: true,
                  message: 'Por favor insira o preço de venda',
                }]}
              >
                <Input type="number" placeholder="Preço de venda" />
              </Form.Item>
            </>
          ))
        }
        <Form.Item>
          <Button
            icon={<PlusCircleOutlined /> }
            onClick={() => setProductsSales([...productsSales, 1])}
            type="link" className="login-form-button">
            Mais um Produto
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Cadastrar Produto
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