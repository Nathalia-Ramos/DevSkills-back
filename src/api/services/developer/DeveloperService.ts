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

          const token = Jwt.sign({id: userExist.id, type:"DEVELOPER"}, 'secret',{expiresIn: '7d'})
        
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

        if(tokenValidate.type === 'DEVELOPER') {

          if(devProfile.email) {

            const emailExist = await DeveloperModel.findBy('email', devProfile.email);

            if(!emailExist) {
              return {
                error: message.UserAlreadyExist,
                statusCode: 400
              }
            }

          }

          const userID = tokenValidate.id

          const devInfo = {
            biografia: devProfile.biografia,
            nome: devProfile.nome,
            email: devProfile.email,
            tag: devProfile.tag,
            foto_perfil: devProfile.foto_perfil,
            link_github: devProfile.link_github,
            link_portfolio: devProfile.link_portfolio,
            permissao_email: devProfile.permissao_email,
        
            id_usuario: userID,
            id_genero: devProfile.id_genero,
          }

            const devUpdated = await UserDeveloperModel.updateDevInfo(devInfo)
            
            if (!devUpdated) {
              return {
                error: "Não foi possível atualizar os dados base de usuario. (Nome, email, biografia, foto de perfil, redes sociais ou permissao de email.).",
                statusCode: 500
              }
            }

            
            if(devProfile.senha) {

              const userLogin = await UserDeveloperModel.findLogin(userID)

              if(userLogin) {
  
                if(validateRegex(devProfile.senha, "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$")) {
                  devProfile.senha = await bcrypt.hash(devProfile.senha, 10)
                } else {
                  return {
                    error: message.PasswordError,
                    statusCode: 400,
                  }
                }
  
              } else {
                return {
                  error: "Não foi possivel atualizar o login do usuario.",
                  statusCode: 500
                }
              }
  
                const loginUpdated = await UserDeveloperModel.updateDevLogin(
                  devProfile.senha,
                  userLogin?.id,
                  userID
                ) 
                
                if(!loginUpdated) {
                  return {
                    error: "Não foi possivel atualizar o login do usuario.",
                    statusCode: 500
                  }
                }

              }

            if(devProfile.id_usuario_telefone) {

              if(devProfile.ddd_telefone && devProfile.numero_telefone && devProfile.id_tipo_telefone) {

                const phoneUpdated = await UserDeveloperModel.updateDevPhone(
                  devProfile.ddd_telefone,
                  devProfile.numero_telefone,
                  devProfile.id_usuario_telefone,
                  devProfile.id_tipo_telefone,
                  userID,
                )

                if(!phoneUpdated) {
                  return {
                    error: "Não foi possivel atualizar o telefone do usuario.",
                    statusCode: 500
                  }
                }

              }

            } else {

              if(devProfile.ddd_telefone && devProfile.numero_telefone && devProfile.id_tipo_telefone) {
                const newPhone = await UserDeveloperModel.createDevPhone(
                  devProfile.ddd_telefone,
                  devProfile.numero_telefone,
                  devProfile.id_tipo_telefone,
                  userID
                )

                if(!newPhone) {
                  return {
                    error: "Não foi possivel cadastrar o novo telefone do usuario.",
                    statusCode: 500
                  }
                }

              }

            }

            if(devProfile.id_usuario_endereco) {
  
              if(devProfile.bairro && devProfile.cep && devProfile.cidade && devProfile.estado && devProfile.logradouro && devProfile.numero_rua) {
                
                const cityExist = await UserDeveloperModel.findCity(devProfile.cidade)
                const stateExist = await UserDeveloperModel.findState(devProfile.estado)
                
                if(!cityExist) devProfile.id_cidade = 0 
                if(!stateExist) devProfile.id_estado = 0 

                const addressUpdated = await UserDeveloperModel.updateDevAddress(
                  devProfile.bairro,
                  devProfile.cep,
                  devProfile.cidade,
                  devProfile.estado,
                  devProfile.logradouro,
                  devProfile.numero_rua,
                  devProfile.complemento,
                  devProfile.id_cidade,
                  devProfile.id_estado,
                  devProfile.id_usuario_endereco,
                )
    
                if(!addressUpdated) {
                  return {
                    error: "Não foi possivel atualizar o endereço de usuario.",
                    statusCode: 500
                  }
                }
              }

            } else {

              if(devProfile.estado && devProfile.cidade) {

                const cityExist = await UserDeveloperModel.findCity(devProfile.cidade)
                const stateExist = await UserDeveloperModel.findState(devProfile.estado)
                  
                if(!cityExist) devProfile.id_cidade = 0 
                if(!stateExist) devProfile.id_estado = 0 

              }

              if(devProfile.bairro && devProfile.cep && devProfile.cidade && devProfile.estado && devProfile.logradouro && devProfile.numero_rua) {
                const newAddress = await UserDeveloperModel.createDevAddress(
                  devProfile.bairro,
                  devProfile.cep,
                  devProfile.cidade,
                  devProfile.estado,
                  devProfile.logradouro,
                  devProfile.numero_rua,
                  devProfile.complemento,
                  userID,
                  devProfile.id_cidade =0,
                  devProfile.id_estado =0,
                )
    
                if(!newAddress) {
                  return {
                    error: "Não foi possivel atualizar o endereço de usuario.",
                    statusCode: 500
                  }
                }
              }

            }

            if(devProfile.ids_habilidades) {
              const deleteSkills = await UserDeveloperModel.deleteSkills(userID)

              if(deleteSkills) {
                devProfile.ids_habilidades.forEach(skillID => {
                  UserDeveloperModel.relateSkills({id_usuario: userID, id_habilidade: skillID})  
                });
              } else {
                return {
                  error: "Não foi possivel atualizar as habilidades do usuario.",
                  statusCode: 500
                }
              }

            }

            if(devProfile.ids_stacks) {
              const deleteStacks = await UserDeveloperModel.deleteStacks(userID)

              if(deleteStacks) {
                devProfile.ids_stacks.forEach(stackID => {
                  UserDeveloperModel.relateStacks({id_usuario: userID, id_stack: stackID})  
                });
              } else {
                return {
                  error: "Não foi possivel atualizar as stacks do usuario.",
                  statusCode: 500
                }
              }

            }
            
            return {
              message: "Dados atualizados com sucesso.",
              statusCode: 200
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

static async listUserProfile(tokenValidate: TokenData | ErrorReturn, id: number) {

  if('id' in tokenValidate) {

    if(tokenValidate.type == 'DEVELOPER') {
      if(tokenValidate.id != id) {
        return {
          error: "Acesso negado.",
          statusCode: 401
        }
      }
    }

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
static async getUsers(){
  const result = await DeveloperModel.getAllUsers()

  return result
}


}
