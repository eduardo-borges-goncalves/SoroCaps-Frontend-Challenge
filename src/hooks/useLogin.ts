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
            
            if (access_token) {
                setIsAuthenticated(true)
                const in1Hour = 1/24;
                Cookies.set("access_token", access_token, { expires: in1Hour })
                Cookies.set("id", id, { expires: in1Hour })
                Cookies.set("name", name, { expires: in1Hour })
                navigate("/");
            } else erro = 'Usuário ou senha Inválidos'
        } catch (error: any) {
            if (error.response.status !== 401)
                erro = 'Erro ao autenticar usuário. Tente novamente mais tarde.'
            else erro = 'Usuário ou senha Inválidos'
        }
        return erro
    }
    return { login }
}

export default useLogin;