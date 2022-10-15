import {Request, Response} from "express";
import GenderModel from "../../models/Gender/GenderModel";
import message from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class GenderController{
    static async execute(req: Request, res: Response){
        
        const { nome } = req.body;

        if (validateRegex(nome, '^[a-zA-Z ]*$')) {
            try {
                const newGender = await GenderModel.execute({nome})
                return res.status(200).json({ message: message.Success, dados: newGender })
            } catch (error) {
                console.log(error)
                return res.send({ message: message.Conflict })
            }
        } else {
            return res.send({ message: message.Conflict })
        }
       
    }

}
