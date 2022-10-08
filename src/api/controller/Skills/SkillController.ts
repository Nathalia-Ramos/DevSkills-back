import {Request, Response} from "express";
import SkillModel from "../../models/Skill/SkillModel";
import message from "../../../config/ReturnMessages";
import validateRegex from "../../../utils/RegexValidate";

export default class SkillController{
    static async execute(req: Request, res: Response){
        
        const skill = req.body;

        if (validateRegex(skill.nome, '^[a-zA-Z ]*$')) {
            try {
                const newSkill = await SkillModel.create(skill)
                return res.status(200).json({message: message.Success, dados: newSkill})
            } catch (error) {
                console.log(error)
                return res.send({message: message.Conflict})
            }
        } else {
            return res.send({message: message.Conflict})
        }
       
    }

}
