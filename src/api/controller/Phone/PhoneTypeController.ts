import {Request, Response} from "express";
import PhoneType from "../../models/Phone/PhoneTypeModel"
import message from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class PhoneTypeController{
    static async execute(req: Request, res: Response){
        
        const { nome } = req.body;

        if (validateRegex(nome, '^[a-zA-Z ]*$')) {
            try {
                const newPhoneType = await PhoneType.execute({nome})
                return res.status(200).json({message: message.Success, dados: newPhoneType})
            } catch (error) {
                console.log(error)
                return res.send({message: message.Conflict})
            }
        } else {
            return res.send({message: message.Conflict})
        }
       
    }

}
