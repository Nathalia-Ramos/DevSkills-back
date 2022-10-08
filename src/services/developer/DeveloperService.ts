import RegisterDeveloperData from "../../interfaces/RegisterDeveloper";
import LoginDeveloper from "../../interfaces/LoginDeveloper";
import DeveloperPhoneData from "../../interfaces/DeveloperPhone";
import DeveloperModel from "../../api/models/Developer/UserDeveloperModel";
import DeveloperPhoneModel from "../../api/models/Phone/DeveloperPhoneModel";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import validateRegex from "../../utils/RegexValidate";
import message from "../../config/ReturnMessages";
import UserDeveloperModel from "../../api/models/Developer/UserDeveloperModel";
import { compare } from "bcrypt";

export default class DeveloperService {
  static async create(userInfo: RegisterDeveloperData) {
    
    const userExist = await DeveloperModel.findByCPF(userInfo.cpf);

    if (Object.values(userExist)[0] == null) {
      if (userInfo.nome, userInfo.email, userInfo.cpf, userInfo.data_nascimento) {
        if (userInfo.senha == userInfo.confirmar_senha) {

          // uma maiuscula, uma minuscula, um especial, min 8 e max 15, com NUMEROS
          if (validateRegex(userInfo.senha, "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$")) {
            // email com no min 3 caracteres antes do @ e no min 2 caracteres apos os .
            if (validateRegex(userInfo.email, "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{3,90}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{2,61}[a-zA-Z0-9])+\.(?:\.?[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]){1,10})*$")) {
  
              const hashPassword = await bcrypt.hash(userInfo.senha, 10);
      
              const developerData = {
                nome: userInfo.nome,
                email: userInfo.email,
                cpf: userInfo.cpf,
                data_nascimento: userInfo.data_nascimento,
                id_genero: userInfo.id_genero,
              };
      
              try {
                const newDeveloper = await DeveloperModel.create(developerData);

                // console.log({ usuario: newDeveloper })
                
                const developerID = Object.values(newDeveloper)[0];
      
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
                    error: message.Conflict,
                    statusCode: 401,
                  }
                }

                try {
                  userInfo.ids_habilidades.forEach(skillId => {
                    DeveloperModel.relateSkills({id_usuario: developerID, id_habilidade: skillId})  
                  });
                } catch (error) {
                  return {
                    error: message.Conflict,
                    statusCode: 401,
                  }
                }

                try {
                  await DeveloperModel.createLogin(hashPassword, developerID)
                } catch (error) {
                  return {
                    error: message.Conflict,
                    statusCode: 401,
                  }
                }
                
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
              } else {
                return {
                  error: message.EmailError,
                  statusCode: 401,
                };
              }
            } else {
              return {
                error: message.PasswordError,
                statusCode: 400,
              };
            }
          } else {
            return {
              error: message.ConfirmPassError,
              statusCode: 401,
            }
          }
        } else {
          return {
            error: message.MissingFields,
            statusCode: 401,
          }
        }
    } else {
      return {
        error: message.UserAlreadyExist,
        statusCode: 401,
      }
  }
}
  static async auth(loginInfo: LoginDeveloper) {

    const userExist = await DeveloperModel.findByEmail(loginInfo.login);

    if (Object.values(userExist)[0] != null) {
      const DeveloperSenha = Object.keys(userExist).values()

      console.log(DeveloperSenha)


      return {
        message: message.Success,
        statusCode: 201,
      }
  } else {
    return {
      error: message.UserNotFound,
      statusCode: 404,
    }
  }
}
}
