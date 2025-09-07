"use client";

import { useState } from "react";
import style from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const route = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de autenticação bem-sucedida
    route.push("/anime/list");
  };

  return (
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        id="username"
        placeholder="Usuário"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        autoFocus
        autoComplete="username"
      />
      <input
        type="password"
        id="password"
        placeholder="Senha"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
