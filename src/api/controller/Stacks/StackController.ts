import {Request, Response} from "express";
import StackModel from "../../models/Stack/StackModel";
import message from "../../../config/ReturnMessages";
import validateRegex from "../../../utils/RegexValidate";

export default class StackController{
    static async execute(req: Request, res: Response){
        
        const { nome } = req.body;

        if (validateRegex(nome, '^[a-zA-Z ]*$')) {
            try {
                const newStack = await StackModel.execute(nome)
                return res.status(200).json({message: message.Success, dados: newStack})
            } catch (error) {
                console.log(error)
                return res.send({message: message.Conflict})
            }
        } else {
            return res.send({message: message.Conflict})
        }
       
    }

}
