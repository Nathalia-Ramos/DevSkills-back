import CompanyUser from "../../interfaces/Company/CompanyUser";
import UserCompanyModel from "../../models/Company/UserCompanyModel";
import bcrypt, { compare } from "bcrypt"
import { prismaClient } from "../../../database/prismaClient";
import generator from "generate-password"
import nodemailer from "nodemailer"
import filter from './../../interfaces/Test/AdminFilter';
import { ErrorReturn } from "../../interfaces/ReturnPattern/Returns";
import TokenData from "../../interfaces/Token/Token";

export default class CompanyService {
    static async createCompany (user: CompanyUser ){
    
        const userExist = await UserCompanyModel.findCompanyCnpj(user.cnpj)

        if (userExist == null) {
        if(user.nome_fantasia, user.cnpj, user.email, user.senha, user.confirmar_senha){
                if (user.cnpj.length > 14 || user.cnpj.length < 14) return { error: "CNPJ inválido"}; {
                    if(user.senha != user.confirmar_senha) return { error: "As senhas não combinam"}; {
                        if(!user.senha?.match(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$/)) return { error: "Senha inválida"};{

                            const State = {
                                nome_estado : user.estado
                            }

                            const StateCompany = await UserCompanyModel.createState(State)

                            const StateID = StateCompany.id

                            
                            const CityCreate = {
                                   nome_cidade: user.nome_cidade,
                                   id_estado: StateID
                            }

                            try {
                                    
                                const newCity = await UserCompanyModel.createCity(CityCreate)
                               
                                const CityId = newCity.id
                                
                                const CompanyAdress = {
                                    bairro: user.bairro,
                                    logradouro: user.logradouro,
                                    numero_rua: user.numero_rua,
                                    complemento: user.complemento,
                                    cep: user.cep,
                                    id_cidade: CityId,
                                }
                             
                                try {
                                  const Address =  await UserCompanyModel.createAdress(CompanyAdress)

                                  const AddressID = Address.id

                                    const CompanyUser = {
                                        nome_fantasia : user.nome_fantasia,
                                        cnpj: user.cnpj,
                                        email: user.email,
                                        idEndereco: AddressID
                                    }
                         
                            try {
                               const newCompany = await UserCompanyModel.create(CompanyUser)
                                
                               const companyID = newCompany.id

                                const CompanyPhone = {
                                    ddd: user.ddd,
                                    numero_telefone: user.numero_telefone,
                                    id_empresa: companyID
                                    
                                };
                                
                        
                                await UserCompanyModel.createPhone(CompanyPhone)

                                const hashPassword = await bcrypt.hash(user.senha, 10);
                                
                                const createLogin = {

                                    senha: hashPassword,
                                    id_empresa: companyID

                                }

                                await UserCompanyModel.Login(createLogin)
                            
                                
                
                                return "Registro inserido com sucesso"

                            } catch (error: any) {
                                console.error(error)
                            }
                                    
                           } catch (error: any) {
                            console.error(error)
                           }
                                
                               
                                
                          } catch (error) {
                                    console.error(error)                                
                         }
                 
                        }
                    }
            }
            }
       }
    }
    static async sendMail(email: string) {

        const userExist = await UserCompanyModel.findEmailCompany(email);
    
        if (userExist != null) {
    
          const loginUser = await UserCompanyModel.findIDLogin(userExist.id)
    
          if (loginUser) {
            
                  const newPassword = generator.generate({
                    length: 10,
                    numbers: true,
                    symbols: true,
                    uppercase: true,
                    lowercase: true
                  })
                  
                  const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: 'skillhunters.devskills@gmail.com',
                      pass: 'sgxlqcracqcwqyut',
                    }
                  })
            
                  const info = await transporter.sendMail({
                    from: "DevSkills <skillhunters.devskills@gmail.com>",
                    to: userExist.email,
                    subject: "Nova Senha",
                    html: "Sua nova senha é: " + newPassword,
                  })

                  const hashPassword = await bcrypt.hash(newPassword, 10);

                  try { 
                      
                      await UserCompanyModel.updatePassword(loginUser.id, hashPassword)
                    
                      return newPassword;

                  } catch (error) {
                      console.log(error)
                  }
              
                }


            
        }

    }
    static async getCompanySeacrh(pesquisa: string){
        const result =  UserCompanyModel.userSeach(pesquisa)
        
        return result
    }
    static async listTestCompany(tokenValidate: TokenData | ErrorReturn, filters: filter){

        if('id' in tokenValidate) {

            const totalResults = await UserCompanyModel.searchTestCompany(tokenValidate.id, filters)

            if (totalResults) {
                const startIndex = 20 * filters.pagina
                const endIndex = 20 * (filters.pagina + 1)

                const result = totalResults.slice(startIndex, endIndex)
      
                return {
                    data: {
                        totalPages: Math.ceil(totalResults?.length / 20),
                        totalResult: totalResults?.length,
                        page: filters.pagina + 1,
                        results: result
                    },
                    statusCode: 200
                }
            } else {
                return {
                    error: "Não foram encontradas provas com as características especificadas.",
                    statusCode: 404,
                }
            }
            
          } else {
            return {
              error: tokenValidate.error,
              statusCode: tokenValidate.statusCode
            }
          }
       
    }
    static async listCompany(){
        const result = await UserCompanyModel.listCompanyNumber()

        return result
    }
 
  
}