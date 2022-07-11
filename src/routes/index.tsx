export const Routes = {
    return(
        <Routes>
            <Route path="/login" element={<LoginPage />}
            <Route path="/" element={<HomePage />}/>

            <Route path="/user" element={<UserPage/>}
            <Route path="/client" element={<ClientPage/>}
            <Route path="/product" element={<ProductPage/>}
            
            <Route path="/sales-orders" element={<SalesOrdersPage/>}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}