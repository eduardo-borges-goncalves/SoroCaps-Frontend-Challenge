import React, { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"

export const Login = () => {
  const [erro, setErro] = useState('')
  const login = useLogin(setErro)

  const handleAuthUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErro('')
    senha.length < 6 ?
      setErro('Usuário ou senha Inválidos') :
      login.login(email, senha)
  }

  return (
    <div>login</div>
  )
}