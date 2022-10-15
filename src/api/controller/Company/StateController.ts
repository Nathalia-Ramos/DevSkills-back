import {Request, Response} from "express"

import CompanyData from "../../interfaces/Company/Company"
import CompanyService from "../../services/Company/CompanyServices"


export default class StateController {
    static async execute(req: Request, res: Response){
        const user: CompanyData = req.body

        const users = await CompanyService.createCompany(user)

        return res.status(201).json(users)
 
    }
}