// Importando a model

import { Request } from "express";

// Importando o JWT
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_PASS;

// Função para verificar se o usuário está autenticado
const authGuard = async (req: Request) => {
  // Resgatando a sessão de authorization dos headers
  const authHeader = req.headers["authorization"];

  // Resgatando o valor do token no cabeçalho da requisição
  const token = authHeader && authHeader.split(" ")[1]; // Bearer ewne3eb2hb2hbwsudb92

  // Validação para verificar se o token está presente no cabeçalho
  if (!token) return { error: "Acesso negado!" };

  // Validação para verificar se o token é válido
  try {
    // Validação para verificar se o token é válido pelo método do JWT
    const { id }: any = jwt.verify(token, jwtSecret!);

    return id;
  } catch (error) {
    // Retornando uma mensagem de erro para o front
    return { error: "Token inválido" };
  }
};

export default authGuard;
