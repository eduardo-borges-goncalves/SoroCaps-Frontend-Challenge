import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../components/Layout"
import { ClientsPage } from "../pages/ClientsPage"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { ProductsPage } from "../pages/ProductsPage"
import { SalesOrdersPage } from "../pages/SalesOrdersPage"
import { UsersPage } from "../pages/UsersPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/" element={<Layout />} >
                    <Route index element={<HomePage />} />

                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/products" element={<ProductsPage />} />

                    <Route path="/sales-orders" element={<SalesOrdersPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}