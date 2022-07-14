import { Button } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

import "./styles.css"

export const SalesOrdersPage = () => {
  const [salesOrders, setSalesOrders] = useState([])
  const [visibleProcess, setVisibleProcess] = useState("process")
  const [aproved, setAproved] = useState([])
  const [inProcess, setInProcess] = useState([])
  console.log(aproved)

  const getSales = async () => {
    try {
      const response = await apiClient.get('/sales-orders')
      let inProcess: any = [];
      let aproved: any = []
      response.data.map((client: any) => {
        client['sales-orders'].map((saleOrder: any) => {
          saleOrder.status === "EM PROCESSO" ?
            inProcess.push(
              {
                companyName: client.companyName,
                ...saleOrder
              }
            )
            :
            aproved.push(
              {
                companyName: client.companyName,
                ...saleOrder
              }
            )
        });
      })

      setSalesOrders(response.data)
      setAproved(aproved)
      setInProcess(inProcess)
    } catch (error) {
      window.alert("Ocorreu um erro ao buscar os pedidos de venda. Tente novamente mais tarde.")
    }
  }

  useEffect(() => { getSales() }, [])

  return (
    <div className="container2" >
      <Link to={"/sales-orders/create"}>
        <Button type="link" icon={<PlusCircleOutlined />}>
          Novo Pedido
        </Button>
      </Link>
      <header className="header-so">
        <nav>
          <ul>
            <li onClick={() => setVisibleProcess("process")}>
              Em processo
            </li>
            <li onClick={() => setVisibleProcess("aproved")}>
              Aprovado
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <table>
          <thead>
            <tr >
              <th>
                Status
              </th>
              <th>
                Cliente
              </th>
              <th className="product-code">
                Produtos
              </th>
              <th className="product-quantity">
                Qnte.
              </th>
              <th className="product">
                Preço de Venda
              </th>
              <th className="product">
              </th>
            </tr>
          </thead>
          <tbody>
            {
              visibleProcess === "process" ?
                inProcess.map((salesOrder: any) => (
                  <>
                    <tr>
                      <td>
                        {salesOrder.status}
                      </td>
                      <td>
                        {salesOrder.companyName}
                      </td>
                      <td className="product-code">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              Cód:{product.codeProduct}
                            </span>

                          ))
                        }
                      </td>
                      <td className="product-quantity">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              {product.quantity}
                            </span>
                          ))
                        }
                      </td>
                      <td className="product">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              {product.priceSales
                                .toLocaleString('pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2
                                  }
                                )
                              }
                            </span>
                          ))
                        }
                      </td>
                      <td className="action">
                        <Button type="link">
                          Aprovar
                        </Button>
                      </td>
                    </tr>
                  </>
                ))
                :
                aproved.map((salesOrder: any) => (
                  <>
                    <tr>
                      <td>
                        {salesOrder.status}
                      </td>
                      <td>
                        {salesOrder.companyName}
                      </td>
                      <td className="product-code">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              Cód:{product.codeProduct}
                            </span>

                          ))
                        }
                      </td>
                      <td className="product-quantity">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              {product.quantity}
                            </span>
                          ))
                        }
                      </td>
                      <td className="product">
                        {
                          salesOrder['product-sales'].map((product: any) => (
                            <span>
                              {product.priceSales
                                .toLocaleString('pt-BR',
                                  {
                                    style: 'currency',
                                    currency: 'BRL',
                                    minimumFractionDigits: 2
                                  }
                                )
                              }
                            </span>
                          ))
                        }
                      </td>
                      <td className="action">
                        <Button type="link">
                          Aprovar
                        </Button>
                      </td>
                    </tr>
                  </>
                ))
            }
          </tbody>
        </table>
      </section>
    </div >
  )
}