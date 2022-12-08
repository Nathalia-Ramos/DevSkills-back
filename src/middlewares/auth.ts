import { Request } from "express";
import { ErrorReturn } from "../api/interfaces/ReturnPattern/Returns"
import TokenData from "../api/interfaces/Token/Token";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_PASS;

// Função para verificar se o usuário está autenticado
const authGuard = async (req: Request) : Promise<TokenData | ErrorReturn> => {

  const authHeader = req.headers["authorization"];

  const userToken = authHeader && authHeader.split(" ")[1]; // Bearer ewne3eb2hb2hbwsudb92

  if (!userToken) return { error: "Acesso negado!", statusCode: 401 };

  try {

    const { id, type } : any = jwt.verify(userToken, jwtSecret!);
    
    return {
      id: id,
      type: type,
      token: userToken
    };

  } catch (error) {
    return {
      error: "Token inválido",
      statusCode: 401 
    };
  }
};

export default authGuard;
