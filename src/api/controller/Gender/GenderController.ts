import { Request, Response } from "express";
import GenderModel from "../../models/Gender/GenderModel";
import ReturnMessages from "../../../config/ReturnMessages";

export default class GenderController{
    static async showAll(req: Request, res: Response){

        const genderList = await GenderModel.showAll()

        return res.status(200).json(
            {message: ReturnMessages.SuccessfulRequest, data: genderList})
    
    }
}
