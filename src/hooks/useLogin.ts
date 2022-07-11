import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../../context"
import apiClient from "../../services/api-client"

const useLogin = (setLoginErro: React.Dispatch<React.SetStateAction<string>>) => {

    const { updateAuthData, setIsAuthenticated } = useAuthentication()
    const navigate = useNavigate()

    const login = async (userLogin: string, password: string ) => {
        try {
            const response = await apiClient.post("/login", { userLogin, password })
            const { access_token, id, name } = response.data
            
            if (access_token) {
                updateAuthData({ id, access_token, nome })
                setIsAuthenticated(true)
                Cookies.set("access_token", access_token, { expires: 365 })
                Cookies.set("id", id, { expires: 365 })
                Cookies.set("name", nome, { expires: 365 })
                navigate("/");
            } 
            else setLoginErro('Usuário ou senha Inválidos') 

        } catch (error: any) {
            error.response.data.statusCode === 401 
            ?
            setLoginErro('Usuário ou senha Inválidos') 
            :
            setLoginErro('Erro ao autenticar usuário. Tente novamente mais tarde.');
        }
    }

    return { login }
}

export default useLogin;