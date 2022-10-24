import bcrypt, { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import ReturnMessages from "../../../config/ReturnMessages";
import AdminModel from "../../../api/models/Admin/UserAdminModel";
import AdminData from "../../interfaces/Admin/Admin";
import validateRegex from "../../utils/RegexValidate";

export default class AdminService {
    static async create(userInfo: AdminData) {
    
        const userExist = await AdminModel.findByEmail(userInfo.email);
    
        if (userExist == null) {
          if (userInfo.nome, userInfo.email, userInfo.senha, userInfo.root) {
    
              // uma maiuscula, uma minuscula, um especial, min 8 e max 15, com NUMEROS
              if (validateRegex(userInfo.senha, "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$")) {
      
                  const hashPassword = await bcrypt.hash(userInfo.senha, 10);

                  try {
                    const newAdmin = await AdminModel.create(userInfo.nome, userInfo.email, userInfo.root);

                    const adminID = newAdmin.id;

                    try {
                      await AdminModel.createLogin(hashPassword, adminID)
                    } catch (error) {
                      return {
                        error: ReturnMessages.Conflict,
                        statusCode: 401,
                      }
                    }
                    
                    return {
                      message: ReturnMessages.UserCreated,
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
                    error: ReturnMessages.PasswordError,
                    statusCode: 400,
                  };
                }
            } else {
              return {
                error: ReturnMessages.MissingFields,
                statusCode: 401,
              }
            }
        } else {
          return {
            error: ReturnMessages.UserAlreadyExist,
            statusCode: 401,
          }
      }
    }

    static async auth(login: string, senha: string) {

        const adminExist = await AdminModel.findByEmail(login)
        
        if (adminExist != null) {
            const adminLogin = await AdminModel.findLogin(adminExist.id)
      
            if (adminLogin) {
              if (await bcrypt.compare(senha, adminLogin?.senha)) {
                const token = JWT.sign({id: adminExist.id}, 'secret', {expiresIn: '1d'})
                
                return {
                  message: ReturnMessages.UserAuthorized,
                  token: token,
                  userType: "ADMIN",
                  statusCode: 200,
                }
              } else {
                return {
                  message: ReturnMessages.PasswordError,
                  statusCode: 401,
                }
              }
            } else {
              return {
                error: ReturnMessages.UserNotFound,
                statusCode: 401,
              }
            } 
        } else {
          return {
            error: ReturnMessages.UserNotFound,
            statusCode: 404,
          }
        }

    }
}