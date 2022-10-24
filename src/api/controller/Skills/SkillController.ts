import {Request, Response} from "express";
import SkillModel from "../../models/Skill/SkillModel";
import ReturnMessages from "../../../config/ReturnMessages";
import validateRegex from "../../utils/RegexValidate";

export default class SkillController{
    static async create(req: Request, res: Response){
        
        const skill = req.body;

        if (validateRegex(skill.nome, '^[a-zA-Z ]*$')) {
            try {
                const newSkill = await SkillModel.create(skill)
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
