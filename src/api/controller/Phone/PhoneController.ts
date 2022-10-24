import {Request, Response} from "express";
import PhoneModel from "../../models/Phone/PhoneModel"
import ReturnMessages from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class PhoneController{
    static async showTypes(req: Request, res: Response){
        
        const phoneTypes = await PhoneModel.showTypes()

        return res.status(200).json({message: ReturnMessages.SuccessfulRequest, dados: phoneTypes})

    }

}
