import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../contexts/Authentication';

export const Header = () => {
  const { isAuthenticated } = useAuthentication()

  return (
    <Menu mode="horizontal" defaultSelectedKeys={[`${window.location.pathname}`]}
      style={{
        justifyContent: "flex-end", 
        padding: "0.125rem",
      }}
    >
      <Menu.Item key="/" >
        <Link to="/"/>
        Home Page
      </Menu.Item>
      <Menu.Item key="/sales-orders" >
        <Link to="/sales-orders"/>
        Pedidos de Venda
      </Menu.Item>
      <Menu.Item key="/products">
        <Link to="/products"/>
        Produtos
      </Menu.Item>
      <Menu.Item key="/clients" >
        <Link to="/clients"/>
        Clientes
      </Menu.Item>
      <Menu.Item key="/users" >
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
