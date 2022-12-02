import { Empresa, EmpresaTelefone, LoginEmpresa, prisma, ProvaAndamento } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AddressData from "../../interfaces/Company/Address";
import CityData from "../../interfaces/Company/City";
import CompanyPhoneData from "../../interfaces/Company/CompanyPhone";
import CompanyUser from "../../interfaces/Company/CompanyUser";
import LoginData from "../../interfaces/Company/Login";
import StateData from "../../interfaces/Company/State";
import filter from "./../../interfaces/Test/AdminFilter";

export default class UserCompanyModel {
  static async create({
    cnpj,
    email,
    nome_fantasia,
    idEndereco,
  }: CompanyUser): Promise<any> {
    try {
      const newCompany = await prismaClient.empresa.create({
        data: {
          cnpj,
          email,
          nome_fantasia,
          ativo: true,
          idEndereco,
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
  static async findCompanyCnpj(cnpj: string): Promise<any> {
    try {
      const userExist = await prismaClient.empresa.findUnique({
        where: {
          cnpj: String(),
        },
      });

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
    id_empresa,
  }: CompanyPhoneData): Promise<any> {
    try {
      const newPhoneCompany = await prismaClient.empresaTelefone.create({
        data: {
          ddd,
          numero: numero_telefone,
          idEmpresa: id_empresa,
        },
      });
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
    cep,
  }: AddressData): Promise<any> {
    try {
      const newAddres = await prismaClient.enderecoEmpresa.create({
        data: {
          bairro,
          logradouro,
          numero: numero_rua,
          complemento,
          cep,
          cidade: {
            connect: {
              id: id_cidade,
            },
          },
        },
      });
      prismaClient.$disconnect;

      return newAddres;
    } catch (error: any) {
      console.error(error);

      prismaClient.$disconnect;

      return false;
    }
  }
  static async createCity({ nome_cidade, id_estado }: CityData): Promise<any> {
    try {
      const newCity = await prismaClient.cidade.create({
        data: {
          nome: nome_cidade,
          estado: {
            connect: {
              id: id_estado,
            },
          },
        },
      });

      return newCity;
    } catch (error) {
      prismaClient.$disconnect;

      return false;
    }
  }
  static async createState({ nome_estado }: StateData): Promise<any> {
    try {
      const newState = await prismaClient.estado.create({
        data: {
          nome: nome_estado,
        },
      });
      prismaClient.$disconnect;

      return newState;
    } catch (error) {
      console.error(error);
    }
  }
  static async findAddresID(idEndereco: string): Promise<any> {
    try {
      const FindIDAdress = await prismaClient.enderecoEmpresa.findUnique({
        where: {
          id: Number(idEndereco),
        },
      });

      prismaClient.$disconnect;

      return this.findAddresID;
    } catch (error) {
      prismaClient.$disconnect;
      console.log(error);
    }
  }
  static async Login({ senha, id_empresa }: LoginData): Promise<LoginEmpresa | any> {
    try {
      const newLogin = await prismaClient.loginEmpresa.create({
        data: {
          senha,
          idEmpresa: id_empresa,
        },
      });

      prismaClient.$disconnect;

      return newLogin;
    } catch (error) {

      prismaClient.$disconnect;

      console.log(error);
    }
  }
  static async findIDLogin(id_empresa: number): Promise<LoginEmpresa | null> {
    return await prismaClient.loginEmpresa.findFirst({
      where: {
        idEmpresa: id_empresa,
      },
    });
  }
  static async findEmailCompany(email: string): Promise<Empresa | null> {
    return await prismaClient.empresa.findFirst({
      where: {
        email
      },
    });
  }
  static async updatePassword(
    id: number,
    senha: string
  ): Promise<LoginEmpresa> {
    return await prismaClient.loginEmpresa.update({
      data: {
        senha: senha,
      },
      where: {
        id: id,
      },
    });
  }
  static async allCompany() {
    try {
      const company = await prismaClient.empresa.findMany({
        select:{
          id: true,
          nome_fantasia: true,
          logo: true,
          cnpj: true,
          biografia: true,
          email: true,
          enderecoEmpresa: {
            select:{
              bairro: true,
              cep: true,
              logradouro: true,
              numero: true,
              complemento: true,
              cidade:{
                select:{
                  nome: true
                }
              }
            }
          },
          empresaTelefone:{
            select:{
              ddd: true,
              numero: true
            }
          }
        }
      });

      prismaClient.$disconnect;

      return company;
    } catch (error) {
      prismaClient.$disconnect;

      return error;
    }
  }
  static async userSeach(search: string): Promise<Empresa | any> {
    return await prismaClient.empresa.findMany({
      select: {
        nome_fantasia: true,
        logo: true,
        id: true,
        enderecoEmpresa: {
          select:{
            complemento: true,
            bairro: true,
            cidade: true,
            logradouro: true,
            numero: true
          }
        }
      },
      where: {
        OR: [
          {
            nome_fantasia: {
              contains: search
            }
          },
          {
            provaAndamento: {
              some: {
                prova: {
                  provaStack: {
                    some: {
                      stack: {
                        nome: {
                          contains: search,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            provaAndamento: {
              some: {
                prova: {
                  provaHabilidade: {
                    some: {
                      habilidade: {
                        nome: {
                          contains: search,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            provaAndamento: {
              some: {
                prova: {
                  titulo: {
                    contains: search,
                  },
                },
              },
            },
          },
        ],
      },
    });
  }
  static async searchTestCompany(
    id: number,
    { tipo, ids_stacks, ids_habilidades, pagina }: filter
  ) : Promise<ProvaAndamento[] | null> {
    return await prismaClient.provaAndamento.findMany({
      where: {
        idEmpresa: id,
        prova: {
          provaTipo: {
            tipo: {
              equals: tipo,
            },
          },
          provaHabilidade: {
            some: {
              idHabilidade: {
                in: ids_habilidades,
              },
            },
          },
          provaStack: {
            some: {
              idProvaStack: {
                in: ids_stacks,
              },
            },
          },
        },
      },
      include: {
        prova: {
          select: {
            id: true,
            titulo: true,
            ativo: true,
            descricao: true,
            provaTipo: {
              select: {
                tipo: true,
              },
            },
            provaHabilidade: {
              select: {
                habilidade: {
                  select: {
                    id: true,
                    nome: true,
                    icone: true,
                  },
                },
              },
            },
            provaStack: {
              select: {
                stack: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      }
    });
  }
  static async listCompanyNumber() {
    return await prismaClient.empresa.findMany({
      take: 3,
      select:{
        ativo: true,
        nome_fantasia: true,
        logo: true,
        id: true,
        enderecoEmpresa:{
          select:{
            complemento: true,
            bairro: true,
            cidade: true,
            logradouro: true,
            numero: true
          }
        }
      }
    });
  }
  static async getCompanyById(
    id_empresa: number
  ) : Promise  <Empresa | null>{
    return await prismaClient.empresa.findUniqueOrThrow({
      where: {
        id: 2
      }
    })
  } 
  static async updateProfileCompany(
    idEmpresa: number,
    idTelefone: number,
    idLogin: number,
    idCidade: number,
    cnpj: string,
    senha: string,
    email: string,
    nome_fantasia: string,
    biografia: string, 
    logo: string,
    ddd: string,
    numero_telefone: string,
    logradouro: string, 
    bairro: string,
    numero_rua: string,
    cep: string,
    complemento: string,
    nome_estado: string,
    ///companyData: any,
    //addressData: any,
    //phoneData: any,
    
    nome_cidade: string,
  ): Promise <Empresa | any > {
    return await prismaClient.empresa.update({
      where:{
        id: idEmpresa
      },
      data: {
        cnpj: cnpj,
        email: email,
        nome_fantasia: nome_fantasia,
        biografia: biografia,
        logo: logo,
        enderecoEmpresa:{
          update:{
            bairro: bairro,
            cep: cep,
            logradouro: logradouro,
            numero: numero_rua,
            complemento: complemento,
            cidade:{
              update:{
                nome:  nome_cidade,
                estado:{
                  update:{
                    nome: nome_estado,
                  },
                  
                }
              }
            }
          }
        },
        empresaTelefone:{
          update:{
            where:{
              id: idTelefone
            },
            data:{
              ddd: ddd,
              numero: numero_telefone
            }
          }
        },
        LoginEmpresa:{
          update:{
            where:{
              id: idLogin,
            },
            data:{
              senha: senha
            }
          }
        }
      },
      
    })
  }
}
