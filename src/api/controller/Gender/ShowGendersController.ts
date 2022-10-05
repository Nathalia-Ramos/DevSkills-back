import {Request, Response} from "express";
import GenderModel from "../../models/Gender/GenderModel";
import message from "../../../config/ReturnMessages";

export default class ShowGenderController{
    static async select(req: Request, res: Response){
        try {
            const genderList = await GenderModel.showAll()
            return res.status(200).json({message: "Listagem de Genero", dados: genderList})
        } catch (error) {
            console.log(error)
            return res.send({message: message.Conflict})
        }
       
    }

}
