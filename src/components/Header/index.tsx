import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isAuthenticated = false

  return (
    <Menu mode="horizontal" defaultSelectedKeys={['home']}
      style={{
        justifyContent: "flex-end", 
        padding: "0.125rem",
      }}
    >
      <Menu.Item key="home" >
        <Link to="/"/>
        Home Page
      </Menu.Item>
      <Menu.Item  >
        <Link to="/sales-orders"/>
        Pedidos de Venda
      </Menu.Item>
      <Menu.Item  >
        <Link to="/products"/>
        Produtos
      </Menu.Item>
      <Menu.Item >
        <Link to="/clients"/>
        Clientes
      </Menu.Item>
      <Menu.Item key="users" >
        <Link to="/users"/>
        Usuários
      </Menu.Item>
      <Menu.Item key="login" >
        <Link to="/login"/>
        {isAuthenticated? "Sair" : "Login"}
      </Menu.Item>
    </Menu>
  )
};
