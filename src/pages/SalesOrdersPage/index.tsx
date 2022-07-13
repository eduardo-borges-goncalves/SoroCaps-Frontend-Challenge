export const SalesOrdersPage = () => {
  const [erro, setErro] = useState('')
  const [newProduct, setNewProduct] = useState(false)

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const response = await apiClient.post("/sales-orders", {
        clientId: values.clientId,
 
        description: values.description,
        measurmentUnit: values.measurmentUnit,
        pricePurchase: values.pricePurchase,
        priceSales: values.priceSales
      })
      response && setNewProduct(true)
      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      setErro("Erro ao cadastrar produto. Por favor, tente novamente mais tarde.")
    }
  }

  const { Title } = Typography;
  return (
    <div className="container-user">
      {
        newProduct &&
        <div className="alert-success">
          <Alert
            description="Novo Produto cadastrado com sucesso!"
            type="success"
            showIcon
          />
        </div>
      }
      <Typography>
        <Title> Cadastrar Produto </Title>
      </Typography>
      <Form
        onChange={() => setErro('')}
        className="form"
        initialValues={{ remember: true }}
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item
          name="productCode"
          rules={[{
            required: true,
            message: 'Por favor insira o código do produto',
            min: 2
          }]}
        >
          <Input placeholder="Código do Produto" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{
            required: true,
            message: 'Por favor insira o nome do produto',
            min: 2
          }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{
            required: true,
            message: 'Por favor insira um descrição',
            min: 3
          }]}
        >
          <Input placeholder="Descrição" />
        </Form.Item>
        <Form.Item
          name="measurementUnit"
          rules={[{
            required: true,
            message: 'Por favor insira a unidade de medida',
          }]}
        >
          <Input.Password placeholder="Unidade de Medida" />
        </Form.Item>
        <Form.Item
          name="pricePurchase"
          rules={[{
            required: true,
            message: 'Por favor insira o preço de aquisição',
          }]}
        >
          <Input type="number" placeholder="Preço de aquisição" />
        </Form.Item>
        <Form.Item
          name="priceSales"
          rules={[{
            required: true,
            message: 'Por favor insira o preço de venda',
          }]}
        >
          <Input type="number" placeholder="Preço de venda" />
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