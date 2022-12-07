import GroupService from "../../services/Group/GroupService"
import { Request, Response } from "express"
import {Grupos} from "../../interfaces/Groups/groups"

export default class GroupController {
    static async groupController(req: Request, res: Response){
        const group : Grupos = req.body
        
        const tests = await GroupService.teste(group)
        console.log(tests)
        
        return res.status(201).json({message: "Grupo cadastrado com sucesso!"})
    }
    static async resposta(req: Request, res: Response){
        const {status, idUsuario, idGrupo} = req.body

        const teste = await GroupService.resposta(idUsuario, status,idGrupo)
       // console.log(teste)

        return res.status(201).json({message: "Resposta enviada!"})

    }
}