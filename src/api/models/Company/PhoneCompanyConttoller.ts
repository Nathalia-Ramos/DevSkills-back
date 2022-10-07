import {Request, Response} from "express"

import { EmpresaTelefone } from "@prisma/client"
import CompanyData from "../../../interfaces/Company"

interface Data {
    ddd : string,
    numero: string,
    idEmpresa: number
}

export default class PhoneCompanyModel {
    static async execute({
        ddd,
        numero,
        idEmpresa: idEmpresa
    }: Data): Promise<EmpresaTelefone> {
    
    }
}