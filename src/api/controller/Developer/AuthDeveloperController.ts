import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import message from "../../../config/ReturnMessages";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export default class AuthDeveloperController {
  static async auth(req: Request, res: Response) {
    const login = req.body;

    const password = login.senha;

    const findUser = await UserDeveloperModel.findLogin(login);

    /*  if(await bcrypt.compare(password, findUser.senha)) {
            const data = {
                nome: login.nome,
                idUsuario: login.id,
                type: "USER"
            }

        const token = Jwt.sign({id: login.id}, 'secret', {expiresIn: '1d'})

        res.status(200).json({ data: data, token: token})
        }*/
  }
}
