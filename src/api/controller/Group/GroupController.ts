import GroupService from "../../services/Group/GroupService"
import { Request, Response } from "express"
import tokenVerify from "../../../middlewares/auth"
import {Grupos} from "../../interfaces/Groups/groups"
import authGuard from "../../../middlewares/auth"

export default class GroupController {
    static async groupController(req: Request, res: Response){
        const group : Grupos = req.body
        
        const tests = await GroupService.create(group)
       // console.log(tests)
        
        return res.status(201).json({message: "Grupo cadastrado com sucesso!"})
    }
    static async resposta(req: Request, res: Response){
        const { idUsuario,status, idGrupo} = req.body

        const teste = await GroupService.resposta(idUsuario, status,idGrupo)
       // console.log(teste)

        return res.status(201).json({message: "Resposta enviada!"})

    }
    static async getCompanyGroups(req: Request, res: Response) {

        const {id} = req.params
        //console.log(req)
       
        const result = await GroupService.getGroupCompany(parseInt(id))

        if(result === null) return res.status(400).json({error: "não existe existe id correspondete"})
   
        return res.status(200).json({ data: result })

      
    }
}