import {Request, Response} from "express";
import StackModel from "../../models/Stack/StackModel";
import message from "../../../config/ReturnMessages";

export default class StackController{
    static async select(req: Request, res: Response){
        try {
            const stacksList = await StackModel.showAll()
            return res.status(200).json({message: "Listagem de Stacks", dados: stacksList})
        } catch (error) {
            console.log(error)
            return res.send({message: message.Conflict})
        }
       
    }

}
