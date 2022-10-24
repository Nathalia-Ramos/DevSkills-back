import RegisterDeveloperData from "../../interfaces/Developer/RegisterDeveloper";
import DeveloperModel from "../../models/Developer/UserDeveloperModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import validateRegex from "../../utils/RegexValidate";
import ReturnMessages from "../../../config/ReturnMessages";
import nodemailer from "nodemailer";
import generator from "generate-password";
import PhoneModel from "../../models/Phone/PhoneModel";

export default class DeveloperService {
  static async create(
    userInfo: RegisterDeveloperData) {
    // verificando campos obrigatorios
    if (userInfo.nome, userInfo.email, userInfo.cpf, userInfo.data_nascimento) {
      
      const cpfExist = await DeveloperModel.findBy('cpf', userInfo.cpf);

      // caso usuario nao exista no sistema
      if (cpfExist == null) {

        const emailExist = await DeveloperModel.findBy('email', userInfo.email)

        if (emailExist == null) {

          const phoneTypeExist = await PhoneModel.findType(userInfo.id_tipo_telefone)

          if (phoneTypeExist == null) {
            return {
              error: ReturnMessages.PhoneTypeNotFound,
              statusCode: 400
            }
          } else {
    
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
                        
                        const developerID = newDeveloper.id;
              
                        const PhoneData = {
                          ddd: userInfo.ddd,
                          numero: userInfo.numero,
                          id_tipo: userInfo.id_tipo_telefone,
                          id_usuario: developerID,
                        };
              
                        try {
                          await DeveloperModel.relatePhone(PhoneData);
                          // console.log({ telefone: newPhone })
                        } catch (error) {
                          return {
                            error: error,
                            statusCode: 400,
                          };
                        }

                        if(userInfo.ids_stacks) {
                          try {
                            userInfo.ids_stacks.forEach(stackId => {
                              DeveloperModel.relateStacks({id_usuario: developerID, id_stack: stackId})  
                            });
                          } catch (error) {
                            return {
                              error: ReturnMessages.RelateError + "Stacks",
                              statusCode: 400
                            }
                          }
                        }
        
                        if(userInfo.ids_habilidades) {
                          try {
                            userInfo.ids_habilidades.forEach(skillId => {
                              DeveloperModel.relateSkills({id_usuario: developerID, id_habilidade: skillId})  
                            });
                          } catch (error) {
                            return {
                              error: ReturnMessages.RelateError + "Habilidades",
                              statusCode: 400
                            }
                          }
                        }
        
                        try {
                          await DeveloperModel.createLogin(hashPassword, developerID)
                        } catch (error) {
                          return {
                            error: ReturnMessages.RelateError + "Login",
                            statusCode: 401,
                          }
                        }
                        
                        // usuário criado com sucesso
                        return {
                          message: ReturnMessages.UserCreated,
                          statusCode: 201,
                        };
        
                      } catch (error) {
                        return {
                          error: error,
                          statusCode: 400,
                        };
                      }

                      // caso a senha nao siga as regras
                    } else {
                      return {
                        error: ReturnMessages.PasswordError,
                        statusCode: 400,
                      };
                    }

                // caso o nome tenha caracteres especiais
              } else {
                return {
                  error: ReturnMessages.NameNotAText,
                  statusCode: 400,
                }
              }

              // caso as senhas nao correspondam
              } else {
                return {
                  error: ReturnMessages.ConfirmPassError,
                  statusCode: 400,
                }
              }
          }
            
          } else {
            return {
              error: ReturnMessages.UserAlreadyExist,
            statusCode: 400
          }
        }
        
        // caso usuário já exista no sistema
        } else {
          return {
            error: ReturnMessages.UserAlreadyExist,
            statusCode: 400,
          }
      }
        // caso campos obrigatorios estejam vazios
      } else {
        return {
          error: ReturnMessages.MissingFields,
          statusCode: 400,
        }
      }
  
}
  static async auth(
    login: string, senha: string) {

    const userExist = await DeveloperModel.findBy('email', login);

    if (userExist != null) {
      const developerLogin = await DeveloperModel.findLogin(userExist.id)

      if (developerLogin) {
        if (await bcrypt.compare(senha, developerLogin?.senha)) {
          const token = Jwt.sign({id: userExist.id}, 'secret', {expiresIn: '1d'})
          
          return {
            message: ReturnMessages.UserAuthorized,
            statusCode: 201,
            token: token,
            userType: "DEVELOPER",
            userID: userExist.id,
          }

        } else {
          return {
            message: ReturnMessages.PasswordError,
            statusCode: 400,
          }
        }
      } else {
        return {
          error: ReturnMessages.UserNotFound,
          statusCode: 400,
        }
      } 
  } else {
    return {
      error: ReturnMessages.UserNotFound,
      statusCode: 404,
    }
  }
}
  static async sendMail(
    email: string) {

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
                  user: 'skillhunters.devskills@gmail.com',
                  pass: 'sgxlqcracqcwqyut',
                }
              })
        
              const info = await transporter.sendMail({
                from: "DevSkills <skillhunters.devskills@gmail.com>",
                to: userExist.email,
                subject: "Nova Senha",
                text: "Sua nova senha é: " + newPassword,
              })

              const hashPassword = await bcrypt.hash(newPassword, 10);
              
              try {
                await DeveloperModel.updatePassword(loginUser?.id, hashPassword);

                  return {
                    message: ReturnMessages.NewPassword,
                    statusCode: 200,
                  }

              } catch (error) {
                return {
                  error: error,
                  statusCode: 400,
                }
              }
      } else {
        return {
          error: ReturnMessages.UserNotFound,
          statusCode: 404,
        }
      }

    } else {
      return {
        error: ReturnMessages.NotFound,
        statusCode: 404,
      }
    }
    
  }
}
