import RegisterDeveloperData from "../../interfaces/Developer/RegisterDeveloper";
import DeveloperPhoneData from "../../interfaces/Developer/DeveloperPhone";
import DeveloperModel from "../../models/Developer/UserDeveloperModel";
import DeveloperPhoneModel from "../../models/Phone/DeveloperPhoneModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import validateRegex from "../../utils/RegexValidate";
import message from "../../../config/ReturnMessages";
import { ErrorReturn, SuccessReturn } from "../../interfaces/ReturnPattern/Returns"
import { compare } from "bcrypt";
import nodemailer from "nodemailer";
import generator from "generate-password";
import TokenData from "../../interfaces/Token/Token";
import { updateDev, devProfile } from "../../interfaces/Developer/DeveloperProfile";
import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";

export default class DeveloperService {
  static async create(userInfo: RegisterDeveloperData) {
    
    const userExist = await DeveloperModel.findBy('cpf', userInfo.cpf);

    // caso usuario nao exista no sistema
    if (userExist == null) {
      
      // verificando campos obrigatorios
      if (userInfo.nome, userInfo.email, userInfo.cpf, userInfo.data_nascimento) {
        
        // verificando se as senhas batem
        if (userInfo.senha == userInfo.confirmar_senha) {

          // verificando se o campo nome apenas contem letras
          if (validateRegex(userInfo.nome, '[A-Z a-z]+')) {

              // verificando se a senha segue as regras (uma letra maiuscula, uma minuscula, um caracter especial e um numero, min 8 e max 15 caracteres)
              if (validateRegex(userInfo.senha, "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$")) {
                
                  const hashPassword = await bcrypt.hash(userInfo.senha, 10);
          
                  const developerData = {
                    nome: userInfo.nome,
                    email: userInfo.email,
                    cpf: userInfo.cpf,
                    data_nascimento: userInfo.data_nascimento,
                    permissao_email: userInfo.permissao_email,
                    id_genero: userInfo.id_genero,
                  };
          
                  // realização do cadastro
                  try {
                    const newDeveloper = await DeveloperModel.create(developerData);
    
                    // console.log({ usuario: newDeveloper })
                    
                    const developerID = newDeveloper.id;
          
                    const PhoneData = {
                      ddd: userInfo.ddd,
                      numero: userInfo.numero,
                      id_tipo: userInfo.id_tipo_telefone,
                      id_usuario: developerID,
                    };
                    // console.log(PhoneData)
          
                    try {
                      await DeveloperModel.relatePhone(PhoneData);
                      // console.log({ telefone: newPhone })
                    } catch (error) {
                      return {
                        error: error,
                        statusCode: 401,
                      };
                    }
    
                    try {
                      userInfo.ids_stacks.forEach(stackId => {
                        DeveloperModel.relateStacks({id_usuario: developerID, id_stack: stackId})  
                      });
                    } catch (error) {
                      return {
                        error: message.RelateError + "Stacks",
                        statusCode: 401,
                      }
                    }
    
                    try {
                      userInfo.ids_habilidades.forEach(skillId => {
                        DeveloperModel.relateSkills({id_usuario: developerID, id_habilidade: skillId})  
                      });
                    } catch (error) {
                      return {
                        error: message.RelateError + "Habilidades",
                        statusCode: 401,
                      }
                    }
    
                    try {
                      await DeveloperModel.createLogin(hashPassword, developerID)
                    } catch (error) {
                      return {
                        error: message.RelateError + "Login",
                        statusCode: 401,
                      }
                    }
                    
                    // usuário criado com sucesso
                    return {
                      message: message.UserCreated,
                      statusCode: 201,
                    };
    
                  } catch (error) {
                    return {
                      error: error,
                      statusCode: 401,
                    };
                  }

                  // caso a senha nao siga as regras
                } else {
                  return {
                    error: message.PasswordError,
                    statusCode: 400,
                  };
                }

            // caso o nome tenha caracteres especiais
          } else {
            return {
              error: message.NameNotAText,
              statusCode: 401,
            }
          }

          // caso as senhas nao correspondam
          } else {
            return {
              error: message.ConfirmPassError,
              statusCode: 401,
            }
          }

          // caso campos obrigatorios estejam vazios
        } else {
          return {
            error: message.MissingFields,
            statusCode: 401,
          }
        }

        // caso usuário já exista no sistema
    } else {
      return {
        error: message.UserAlreadyExist,
        statusCode: 401,
      }
  }
}
  static async auth(login: string, senha: string) {

    const userExist = await DeveloperModel.findBy('email', login);

    if (userExist != null) {
      const developerLogin = await DeveloperModel.findLogin(userExist.id)

      // console.log(developerLogin)

      if (developerLogin) {
        if (await bcrypt.compare(senha, developerLogin?.senha)) {
          const token = Jwt.sign({id: userExist.id}, 'secret', {expiresIn: '7d'})
          
          return {
            message: message.UserAuthorized,
            token: token,
            userInfo:{
              id: userExist.id,
              tag: userExist.tag,
              fotoPerfil: userExist.foto_perfil,
            },
            userType: "DEVELOPER",
            statusCode: 200,
          }
        } else {
          return {
            message: message.PasswordError,
            statusCode: 401,
          }
        }
      } else {
        return {
          error: message.UserNotFound,
          statusCode: 401,
        }
      } 
  } else {
    return {
      error: message.UserNotFound,
      statusCode: 404,
    }
  }
}
  static async sendMail(email: string) {

    const userExist = await DeveloperModel.findBy('email', email);

    if (userExist != null) {

      const loginUser = await DeveloperModel.findLogin(userExist.id)

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
                  user: 'devskillsorg@gmail.com',
                  pass: 'krplzgtrhdwgfain',
                }
              })
        
              const info = await transporter.sendMail({
                from: "DevSkills <devskillsorg@gmail.com>",
                to: userExist.email,
                subject: "Nova Senha",
                text: "Sua nova senha é: " + newPassword,
              })

              const hashPassword = await bcrypt.hash(newPassword, 10);
              
              try {
                await DeveloperModel.updatePassword(loginUser?.id, hashPassword);

                  return {
                    message: message.NewPassword,
                    statusCode: 200,
                  }

              } catch (error) {
                return {
                  error: message.ErrorNewPass,
                  statusCode: 401,
                }
              }
      } else {
        return {
          error: message.UserNotFound,
          statusCode: 404,
        }
      }

    } else {
      return {
        error: message.UserNotFound,
        statusCode: 404,
      }
    }
    
}

  static async updateDevProfile(devProfile : devProfile, tokenValidate: TokenData | ErrorReturn) {

    if(Object.keys(devProfile).length > 0) {

      if('id' in tokenValidate) {
  
        if(tokenValidate.type == 'Developer') {
          
            const devData = {
              biografia: devProfile.biografia,
              nome: devProfile.nome,
              email: devProfile.email,
              foto_perfil: devProfile.foto_perfil,
              link_github: devProfile.link_github,
              link_portfolio: devProfile.link_portfolio,
              permissao_email: devProfile.permissao_email,
          
              id_usuario: devProfile.id_usuario,
              id_genero: devProfile.id_genero,
            }
    
            const devUpdated = await UserDeveloperModel.updateDevInfo(devData)

            if(devUpdated) {
              
              const devPhoneData = {
                ddd_telefone: devProfile.ddd_telefone,
                numero_telefone: devProfile.numero_telefone,
            
                id_usuario_telefone: devProfile.id_usuario_telefone,
                id_tipo_telefone: devProfile.id_tipo_telefone,
                id_usuario: devProfile.id_usuario,
              }

              const devPhoneUpdated = await UserDeveloperModel.updateDevPhone(devPhoneData)

              if(devPhoneUpdated) {
                
                const devAddressData = {
                  logradouro: devProfile.logradouro,
                  numero_rua: devProfile.numero_rua,
                  cep: devProfile.cep,
                  bairro: devProfile.bairro,
                  cidade: devProfile.cidade,
                  estado: devProfile.estado,
                  complemento: devProfile.complemento,
                  
                  id_usuario: devProfile.id_usuario,
                  id_cidade: devProfile.id_cidade,
                  id_estado: devProfile.id_estado,
                  id_usuario_endereco: devProfile.id_usuario_endereco,
                }

                const devAddressUpdated = await UserDeveloperModel.updateDevAddress(devAddressData)

                if(devAddressUpdated) {

                  if(devProfile.senha) {
                    const hashPassword = await bcrypt.hash(devProfile.senha, 10)
  
                    const devLoginData = {
                      senha: hashPassword,
                      id_login: devProfile.id_login,
                      id_usuario: devProfile.id_usuario,
                    }
  
                    const devLoginUpdated = await UserDeveloperModel.updateDevLogin(devLoginData)
  
                    if(devLoginUpdated) {
                      return {
                        message: "Dados atualizados com sucesso.",
                        statusCode: 200
                      }
                    } else {
                      return {
                        error: "Não foi possível atualizar a senha do usuário.",
                        statusCode: 400
                      }
                    }
                  } else {
                    return {
                      message: "Dados atualizados com sucesso.",
                      statusCode: 200
                    }
                  }
                } else {
                  return {
                    error: "Não foi possível atualizar o endereço do usuário.",
                    statusCode: 400
                  }
                }
              } else {
                return {
                  error: "Não foi possível atualizar o telefone do usuário.",
                  statusCode: 400
                }
              }
            } else {
              return {
                error: "Não foi possível atualizar os dados base de usuario. (Nome, email, biografia, foto de perfil, redes sociais e permissao para email em massa.).",
                statusCode: 400
              }
            }
  
        } else {
          return {
            error: "Acesso negado.",
            statusCode: 401
          }
        }
    
      } else {
        return {
          error: tokenValidate.error,
          statusCode: tokenValidate.statusCode
        }
      }

    } else {
      return {
        error: message.emptyBody,
        statusCode: 400
      }
    }

  }

static async stack(search: string){
  const stack = await DeveloperModel.testSearch(search);
 
  return stack
}
static async testListUser(search: string){
  const result = await DeveloperModel.searchTestUser(search)

  return result
}

static async listUserProfile(tokenValidate: TokenData | ErrorReturn) {

  if('id' in tokenValidate) {

    const userInfo = await DeveloperModel.getUserInfo(tokenValidate.id)
  
      if (userInfo) {
          return {
              data: userInfo,
              statusCode: 200
          }
      } else {
          return {
              error: "Usuário com o ID especificado não encontrado.",
              statusCode: 404
          }
      }

  } else {
    return {
      error: tokenValidate.error,
      statusCode: tokenValidate.statusCode
    }
  }

}


}
