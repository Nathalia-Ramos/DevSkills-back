import {Request, Response} from "express";
import StackModel from "../../models/Stack/StackModel";
import ReturnMessages from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class StackController{
    static async create(req: Request, res: Response){
        
        const { nome } = req.body;

        if (validateRegex(nome, '^[a-zA-Z ]*$')) {
            try {
                const newStack = await StackModel.createStack(nome)
                return res.status(200).json({message: ReturnMessages.Success, dados: newStack})
            } catch (error) {
                console.log(error)
                return res.send({message: ReturnMessages.Conflict})
            }
        } else {
            return res.send({message: ReturnMessages.Conflict})
        }
       
    }

    static async showAll(req: Request, res: Response){
    
        const stacksList = await StackModel.showAll()
        return res.status(200).json({message: ReturnMessages.SuccessfulRequest, data: stacksList})
    
    }
}
