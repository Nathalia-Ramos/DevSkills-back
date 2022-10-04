import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import CPFValidator from "../../../helpers/CPFValidator"
import validateRegex from "../../../utils/validateRegex";
import message from "../../../config/ReturnMessages";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

interface UserData {
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    data_nascimento: Date,

    tag: string,
    pontuacao_plataforma: number,
    ativo: boolean,
    genero: string,
}

export default class UserDeveloperController {
    static async create(req: Request, res: Response) {

        const user = req.body

        const password = user.senha

        // uma maiuscula, uma minuscula, um especial, min 8 e max 15, com NUMEROS
        if (validateRegex(password, '^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$')) {

            const hashPassword = await bcrypt.hash(password, 10)
            delete user.senha

            try {
                const newUser = await UserDeveloperModel.execute({ ...user, senha: hashPassword });
                
                return res.status(200).json({ message: message.Success, data: newUser })
            } catch (error) {
                return res.json(error)
            }

        } else {
            return res.json({ message: message.PasswordError })
        }
    }
}