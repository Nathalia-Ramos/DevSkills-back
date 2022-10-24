import {Request, Response} from "express";
import SkillTypeModel from "../../models/Skill/SkillTypeModel";
import ReturnMessages from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class SkillController{
    static async execute(req: Request, res: Response){
        
        const skillType = req.body;

        if (validateRegex(skillType.nome, '^[a-zA-Z ]*$')) {
            try {
                const newSkill = await SkillTypeModel.execute(skillType)
                return res.status(200).json({message: ReturnMessages.Success, dados: newSkill})
            } catch (error) {
                console.log(error)
                return res.send({message: ReturnMessages.Conflict})
            }
        } else {
            return res.send({message: ReturnMessages.Conflict})
        }
       
    }

}
