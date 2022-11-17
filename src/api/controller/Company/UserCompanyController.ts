import { Request, Response } from "express";
import UserCompanyModel from "../../models/Company/UserCompanyModel";
import tokenVerify from "../../../middlewares/auth"
import CompanyData from "../../interfaces/Company/Company";
import CompanyService from "../../services/Company/CompanyServices";
import authGuard from './../../../middlewares/auth';
import queryTestFilter from './../../utils/queryTestFilter';

export default class UserCompanyController {
  static async execute(req: Request, res: Response) {
    const user: CompanyData = req.body;

    const users = await CompanyService.createCompany(user);

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  }
  static async sendPassMail(req: Request, res: Response) {
    const { email } = req.body;

    const resposta = await CompanyService.sendMail(email);

    return res.status(200).json({ resposta });
  }
  static async getCompany(req: Request, res: Response) {
    try {
      const company = await UserCompanyModel.allCompany();

      return res.status(200).json({ company });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  static async companySearch(req: Request, res: Response) {
    const { pesquisa } = req.params;

    const result = await CompanyService.getCompanySeacrh(pesquisa);
    console.log(result);

    return res.status(200).json({ data: result });
  }
  static async listTestCompany(req: Request, res: Response) {

    const tokenValidate = await authGuard(req)
    const userFilters = queryTestFilter(req)

    const result = await CompanyService.listTestCompany(tokenValidate, userFilters);

    return res.status(result.statusCode).json(result.error ? { error: result.error } : { data: result.data });

  }
  static async listCompany(req: Request, res: Response) {
    const result = await CompanyService.listCompany();

    return res.status(200).json({ data: result });
  }
  static async perfilCompany(req: Request, res: Response){
      
    const tokenValidate = await tokenVerify(req)
    
    const result = await CompanyService.perfilCompany(tokenValidate)

    return res.status(200).json({data: result})
  }
  static async updateCompanyPerfil(req:Request, res: Response){
    const {id_empresa} = req.params

    const {

      email,
      biografia,
      logo,
      ddd,
      foto,
      legenda,
      senha,
      complemento,
      
    } = req.body

      await CompanyService.updatePerfilCompany(parseInt(id_empresa), email, biografia, logo, ddd, foto, legenda, senha, complemento)
      console.log("ENTROUWW???")
     
      return res.status(200).json({message: "Registro atualizado com sucesso!"})
  }
}