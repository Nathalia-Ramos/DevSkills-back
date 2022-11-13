import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserCompanyModel from "../../models/Company/UserCompanyModel";

const jwtSecret = process.env.JWT_PASS;

export default class AuthController {
  static async authetication(req: Request, res: Response) {
    const { login, senha } = req.body;

    const userExist = await UserCompanyModel.findEmailCompany(login);
    console.log(userExist);

    if (userExist != null) {
      const CompanyLogin = await UserCompanyModel.findIDLogin(userExist.id);
      console.log(CompanyLogin);
      if (CompanyLogin != null) {
        if (await bcrypt.compare(senha, CompanyLogin.senha)) {
          const data = {
            nome: userExist?.nome_fantasia,
            idEmpresa: userExist.id,
            type: "EMPRESA",
          };
          const token = jwt.sign({ id: userExist?.id }, jwtSecret!, {
            expiresIn: "1d",
          });

          return res.json({ data, token });
        }
      }
    }
  }
}
