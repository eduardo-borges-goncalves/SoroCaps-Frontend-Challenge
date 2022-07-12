import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import apiClient from "../services/api-client"

const useLogin = () => {

    const navigate = useNavigate()

    const login = async (userLogin: string, password: string) => {
        let erro = ''
        try {
            const response = await apiClient.post("/login", { userLogin, password })
            const { access_token, id, name } = response.data
            console.log(response);
            

            if (access_token) {
                // updateAuthData({ id, access_token, name })
                // setIsAuthenticated(true)
                console.log("++++++++++++++++++++++++++++++++")
                Cookies.set("access_token", access_token, { expires: 365 })
                Cookies.set("id", id, { expires: 365 })
                Cookies.set("name", name, { expires: 365 })
                navigate("/");
            } else erro = 'Usuário ou senha Inválidos'
        } catch (error: any) {
            console.log(error)
            if (error.response.status !== 401)
                erro = 'Erro ao autenticar usuário. Tente novamente mais tarde.'
            else erro = 'Usuário ou senha Inválidos'
        }
        return erro
    }

    return { login }
}

export default useLogin;