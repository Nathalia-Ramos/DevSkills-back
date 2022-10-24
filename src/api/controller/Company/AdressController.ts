import {NextFunction, Request, Response} from "express"

import { EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../../database/prismaClient"
// import AddressModel from "../../models/Company/AddressModel"
import  CompanyData from "../../interfaces/Company/Company"
import CompanyService from "../../services/Company/CompanyServices"


export default class AddressController { 
    static async execute (req: Request, res: Response){
        
        const user :  CompanyData = req.body

        const users = await CompanyService.createCompany(user)
 
        return res.status(201).json(users)
}

}