import {Request, Response} from "express"

import { EmpresaTelefone } from "@prisma/client"
import CompanyData from "../../../interfaces/Company/Company"
import { prismaClient } from "../../../database/prismaClient"
import CompanyPhone from "../../../interfaces/Company/CompanyPhone"


export default class PhoneCompanyModel {
    static async execute({
        ddd,
        numero_telefone,
        id_empresa,
    
    }: CompanyPhone): Promise<any> {
        try {
            const CreatePhoneCompany = await prismaClient.empresaTelefone.create({
                data: {
                    ddd,
                    numero: numero_telefone,
                    idEmpresa: id_empresa
                }
            })

            prismaClient.$disconnect

            return CreatePhoneCompany

        } catch (error) {
           return false
        }
    }
}