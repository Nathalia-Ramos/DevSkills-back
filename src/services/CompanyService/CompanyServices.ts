import CompanyUser from "../../interfaces/Company/CompanyUser";
import UserCompanyModel from "../../api/models/Company/UserCompanyModel";
import bcrypt, { compare } from "bcrypt"


export default class CompanyService {
    static async createCompany (user: CompanyUser ){
    
        const userExist = await UserCompanyModel.findCompanyCnpj(user.cnpj)

        if (userExist == null) {
        if(user.nome_fantasia, user.cnpj, user.email, user.senha, user.confirmar_senha){
                if (user.cnpj.length > 14 || user.cnpj.length < 14) return { error: "CNPJ inválido"}; {
                    if(user.senha != user.confirmar_senha) return { error: "As senhas não combinam"};{
                        if(!user.senha?.match(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$/)) return { error: "Senha inválida"};{

                            const State = {
                                nome_estado : user.estado
                            }

                            console.log(State)

                            const StateCompany = await UserCompanyModel.createState(State)

                            const StateID = StateCompany.id

                            
                            const CityCreate = {
                                   nome_cidade: user.nome_cidade,
                                   id_estado: StateID
                            }
                            console.log(CityCreate)
                     

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
                                console.log(CompanyAdress)
                                
                                try {
                                  const Address =  await UserCompanyModel.createAdress(CompanyAdress)

                                 const AddressID = Address.id


                            const CompanyUser = {
                            
                                nome_fantasia : user.nome_fantasia,
                                cnpj: user.cnpj,
                                email: user.email,
                                idEndereco: AddressID
                            }

                            
                            console.log(CompanyUser)
                            
                            try {
                               const newCompany = await UserCompanyModel.create(CompanyUser)
                                
                               const companyID = newCompany.id

                                console.log(newCompany)

                                
                                const CompanyPhone = {
                                    ddd: user.ddd,
                                    numero_telefone: user.numero_telefone,
                                    id_empresa: companyID
                                    
                                };
                                
                                console.log(CompanyPhone)
                                await UserCompanyModel.createPhone(CompanyPhone)

                                const hashPassword = await bcrypt.hash(user.senha, 10);
                                
                                const createLogin = {

                                    senha: hashPassword,
                                    id_empresa: companyID

                                }

                                await UserCompanyModel.Login(createLogin)
                            
                                
                
                                return {newCompany, Address, CityCreate, State, CompanyPhone}

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

}