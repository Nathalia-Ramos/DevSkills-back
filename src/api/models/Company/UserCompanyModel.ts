import { PrismaClient, Cidade, Empresa, LoginEmpresa, EmpresaTelefone, EnderecoEmpresa, Estado } from "@prisma/client"
import AddressData from "../../interfaces/Company/Address"; 
import CityData from "../../interfaces/Company/City";
import CompanyUser from "../../interfaces/Company/CompanyUser";
import CompanyPhoneData from "../../interfaces/Company/CompanyPhone";
import LoginData from "../../interfaces/Company/Login";

const prismaClient = new PrismaClient()

export default class UserCompanyModel{
  
  static async createCompany({
    cnpj,
    email,
    nome_fantasia,
    idEndereco
  }: CompanyUser): Promise<Empresa> {

    return await prismaClient.empresa.create({
      data: {
        cnpj,
        email,
        nome_fantasia,
        ativo: true,
        idEndereco
      },
    });
  }

  static async findByCNPJ(
    cnpj : string) : Promise <Empresa | null> {
    
      return await prismaClient.empresa.findUnique({
        where: { 
          cnpj
        } 
      })
  }

  static async relatePhone({
    ddd,
    numero_telefone,
    id_empresa
  }: CompanyPhoneData) : Promise<EmpresaTelefone> {
      return await prismaClient.empresaTelefone.create({
        data: {
          ddd,
          numero: numero_telefone,
          idEmpresa: id_empresa
        }
      })
    }
  
  static async createAdress({
    id_cidade,
    bairro,
    logradouro,
    numero_rua,
    complemento,
    cep
  }: AddressData ) : Promise<EnderecoEmpresa>  {
    
      return await prismaClient.enderecoEmpresa.create({
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
  }

  static async createCity({
    nome_cidade,
    id_estado
  }: CityData) : Promise<Cidade> {
    
      return await prismaClient.cidade.create({
        data:{
          nome: nome_cidade,
          estado: {
            connect:{
              id: id_estado
            }
          }
        }
      })
  }

  static async createState(
    nome_estado: string
  ) : Promise<Estado> {
    return await prismaClient.estado.create({
        data: {
          nome: nome_estado
        }
      })
  }

  static async findAddressID(
    id_endereco : number) : Promise <EnderecoEmpresa | null> {
    return await prismaClient.enderecoEmpresa.findUnique({
        where:{
          id: id_endereco
        }
      })

  }

  static async relateLogin({
    senha,
    id_empresa
  } : LoginData) : Promise <LoginEmpresa> {
    
      return await prismaClient.loginEmpresa.create({
          data: {
            senha,
            idEmpresa: id_empresa
          }
        })
  }

  static async findLoginByID(
    id_empresa: number) : Promise<LoginEmpresa | null> {

      return await prismaClient.loginEmpresa.findFirst({
        where:{
            idEmpresa: id_empresa
        }
      })

  }

  static async findByEmail (
    email: string): Promise<Empresa | null> {
    
      return await prismaClient.empresa.findFirst({
        where: {
          email
        }
      })
          
  }

  static async updatePassword(
    id: number,
    senha : string) : Promise<LoginEmpresa> {
      return await prismaClient.loginEmpresa.update({
        data:{
          senha: senha,
        },
        where: {
          id: id
        }
      })
  } 

}