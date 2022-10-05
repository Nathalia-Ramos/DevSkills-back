import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import DeveloperPhoneModel from "../../models/Phone/DeveloperPhoneModel"
import CPFValidator from "../../../helpers/CPFValidator"
import validateRegex from "../../../utils/RegexValidate";
import message from "../../../config/ReturnMessages";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

interface UserData {
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    data_nascimento: string,

    id_genero: number,

    // ddd: string,
    // numero: string,
    // id_tipo_telefone: number,
}

export default class UserDeveloperController {
    static async create(req: Request, res: Response) {

        let user: UserData = req.body

        const password = user.senha

        // uma maiuscula, uma minuscula, um especial, min 8 e max 15, com NUMEROS
        if (validateRegex(password, '^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$')) {

            user.senha = await bcrypt.hash(password, 10)

            try {
                const newUser = await UserDeveloperModel.execute(user);

                // const userPhone = await DeveloperPhoneModel.execute()

                return res.status(200).json({ message: message.Success, data: newUser })

            } catch (error) {
                console.log(error)
            }

        } else {
            return res.json({ message: message.PasswordError })
        }
    }
}