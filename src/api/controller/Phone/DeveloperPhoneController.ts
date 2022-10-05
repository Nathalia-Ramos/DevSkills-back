import DeveloperPhoneModel from "../../models/Phone/DeveloperPhoneModel";
import validateRegex from "../../../utils/RegexValidate";
import message from "../../../config/ReturnMessages";
import { Request, Response } from "express";

interface UserPhoneData {
    ddd: string,
    numero: string,
    id_tipo: number,
    id_usuario: number
}

export default class UserDeveloperController {
    static async create(req: Request, res: Response) {

        const phone = req.body;

        if (validateRegex(phone.ddd, '^[0-9]*$') && validateRegex(phone.numero, '^[0-9]*$')) {
            try {
                const newDeveloperPhone = await DeveloperPhoneModel.execute(phone)
                return res.status(200).json({message: message.Success, dados: newDeveloperPhone})
            } catch (error) {
                console.log(error)
                return res.send({message: message.Conflict})
            }
        } else {
            return res.send({message: message.Conflict})
        }
       
    }

    }
