import {Request, Response} from "express";
import SkillModel from "../../models/Skill/SkillModel";
import message from "../../../config/ReturnMessages";

export default class ShowSkillsController{
    static async select(req: Request, res: Response){
        try {
            const skillsList = await SkillModel.showAll()
            return res.status(200).json({message: "Listagem de Skills", dados: skillsList})
        } catch (error) {
            console.log(error)
            return res.send({message: message.Conflict})
        }
       
    }

}
