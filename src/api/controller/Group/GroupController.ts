import GroupService from "../../services/Group/GroupService"
import { Request, Response } from "express"
import {Grupos} from "../../interfaces/Groups/groups"

export default class GroupController {
    static async groupController(req: Request, res: Response){
        const group : Grupos = req.body
        
        const tests = await GroupService.createGroup(group)
        console.log(tests)
        
        return res.status(201).json({message: "Grupo cadastrado com sucesso!"})
    }
}