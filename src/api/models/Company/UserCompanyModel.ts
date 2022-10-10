import {Request, Response} from "express"
import AddressData from "../../../interfaces/Company/Address" 
import { Empresa, EmpresaTelefone, prisma } from "@prisma/client"
import { EnderecoEmpresa } from "@prisma/client"
import CityData from "../../../interfaces/Company/City"
import { Estado } from "@prisma/client"
import { Cidade } from "@prisma/client"
import { LoginEmpresa } from "@prisma/client"
import StateData from "../../../interfaces/Company/State"
import { prismaClient } from "../../../database/prismaClient"
import CompanyUser from "../../../interfaces/Company/CompanyUser";
import CompanyPhoneData from "../../../interfaces/Company/CompanyPhone";
import LoginData from "../../../interfaces/Login"
import { equal } from "assert"

export default class UserCompanyModel{
  
  static async create({
    cnpj,
    email,
    nome_fantasia,
    idEndereco
  }: CompanyUser): Promise<any> {
    
    
        try {
          const newCompany = await prismaClient.empresa.create({
            data: {
              cnpj,
              email,
              nome_fantasia,
              ativo: true,
              idEndereco
            },
          });
    
          prismaClient.$disconnect;
    
          return newCompany;
          
        } catch (error) {
          console.error(error);
    
          prismaClient.$disconnect;
    
          return false;
        }

        
      }

      static async findCompanyCnpj(cnpj : string) : Promise <any> {
        
        try {
          const userExist = await prismaClient.empresa.findUnique({
            where: { 
              cnpj : String()
            } 
          })

          prismaClient.$disconnect;
    
          return userExist;

        } catch (error: any) {
          console.error(error);
    
          prismaClient.$disconnect;
    
          return false;
        }
      }

      static async createPhone({
        ddd,
        numero_telefone,
        id_empresa

      }: CompanyPhoneData ) : Promise<any>{
        try {
          const newPhoneCompany = await prismaClient.empresaTelefone.create({
            data: {
              ddd,
              numero: numero_telefone,
              idEmpresa: id_empresa
            }
          })
          prismaClient.$disconnect;
    
          return newPhoneCompany;

        } catch (error: any) {
          //console.error(error);
    
          prismaClient.$disconnect;
    
          return false;
        }
      }

      static async createAdress({
        id_cidade,
        bairro,
        logradouro,
        numero_rua,
        complemento,
        cep
      }: AddressData ) : Promise<any >  {
        try {
          const newAddres = await prismaClient.enderecoEmpresa.create({
            data:{
              bairro,
              logradouro,
              numero: numero_rua,
              complemento,
              cep,
              cidade: {
                connect: {
                  id: id_cidade
                }
              }
            }
          })
          prismaClient.$disconnect;
    
          return newAddres;

        } catch (error: any) {
          console.error(error);
         
          prismaClient.$disconnect;
    
          return false;
        }
      }

      static async createCity({
        nome_cidade,
        id_estado
      }: CityData) : Promise<any> {
        try {
          const newCity = await prismaClient.cidade.create({
            data:{
              nome: nome_cidade,
              estado: {
                connect:{
                  id: id_estado
                }
              }
            }
          })
       
           return newCity;

          

        } catch (error) {
           prismaClient.$disconnect;
    
          return false;
        }
      }

      static async createState({
        nome_estado

      }: StateData) : Promise<any> {
        try {
          const newState = await prismaClient.estado.create({
            data: {
              nome: nome_estado
            }
          })
          prismaClient.$disconnect;
    
          return newState;
        } catch (error) {
          console.error(error)
        }
      }

   
      static async findAddresID(idEndereco : string) : Promise <any> {
        try {
          const FindIDAdress = await prismaClient.enderecoEmpresa.findUnique({
            where:{
              id: Number(idEndereco)
            }
          })

          prismaClient.$disconnect;
    
          return this.findAddresID;
        } catch (error) {

          prismaClient.$disconnect;
          console.log(error)
        }
      }

      static async Login({
        senha,
        id_empresa
      } : LoginData) : Promise <any> {
        
          try {
            const newLogin = await prismaClient.loginEmpresa.create({
              data: {
                senha,
                idEmpresa: id_empresa

              }
            })


          prismaClient.$disconnect;

            return newLogin
            
          } catch (error) {

            prismaClient.$disconnect;
            console.log(error)
          }
      }


    static async findIDLogin(id_empresa: number) : Promise<any | null> {

      try {
        
        const find = await prismaClient.loginEmpresa.findFirstOrThrow({
          where:{
             empresa: {
              id: id_empresa
             }
          }
        })
        return find

      } catch (error) {
        
      }

    }

    static async findEmailCompany (email: string): Promise<any> {
      try {
        const findEmail = await prismaClient.empresa.findUnique({
          where: {
            email
          }
        })
            
          return findEmail
        
      }catch (error) {
        
      }
    
}

}