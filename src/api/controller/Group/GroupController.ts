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
        const { idUsuario, status, idGrupo } = req.body
    //    console.log(req.body)

        const teste = await GroupService.resposta(idUsuario, status,idGrupo)
      //  console.log(idGrupo)
       // console.log(teste, "controller")

        return res.status(201).json({message: "Resposta enviada!"})

    }
    static async getCompanyGroups(req: Request, res: Response) {

        const {id} = req.params
        //console.log(req)
       
        const result = await GroupService.getGroupCompany(parseInt(id))

        if(result === null) return res.status(400).json({error: "não existe existe id correspondete"})
   
        return res.status(200).json({ data: result })

      
    }
    static async getUsersGroups(req: Request, res: Response){
        const { id } = req.params

        const data = await GroupService.getUsersGroups(parseInt(id))

        return res.status(200).json({data: data})
    }
    static async getConviteStatus(req: Request, res: Response){
        const { id } = req.params

        const data = await GroupService.getConviteGroups(parseInt(id))

        return res.status(200).json({data: data})
    }
    static async getConvite(req: Request, res: Response){
        const { id } = req.params

        
        const data = await GroupService.notificationGroup(parseInt(id))
     
        if(data === null ) return res.status(404).json({error: "id não encontrado"})

        return res.status(200).json({data: data})

    }
    static async convitePendente(req: Request, res: Response){
        const { id } = req.params

        
        const data = await GroupService.convitePendente(parseInt(id))
     
        if(data === null ) return res.status(404).json({error: "id não encontrado"})

        return res.status(200).json({data: data})

    }
}
