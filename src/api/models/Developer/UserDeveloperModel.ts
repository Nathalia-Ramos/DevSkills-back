import { PrismaClient, Usuario, LoginUsuario, UsuarioHabilidade, UsuarioStack, UsuarioTelefone, Empresa, Prova, ProvaAndamento } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import DeveloperData from "../../interfaces/Developer/Developer";
import PhoneData from "../../interfaces/Developer/DeveloperPhone";
import DeveloperStacks from "../../interfaces/Developer/DeveloperStacks";
import DeveloperSkills from "../../interfaces/Developer/DeveloperSkills";
import {updateAddress, updateDev, updatePhone, updateLogin} from "../../interfaces/Developer/DeveloperProfile"
import { prismaClient } from "../../../database/prismaClient";

const prisma = new PrismaClient();

export default class UserDeveloperModel {

  static async create({
    nome,
    email,
    cpf,
    data_nascimento,
    id_genero,
    permissao_email,
  }: DeveloperData): Promise<Usuario> {
      return await prisma.usuario.create({
        data: {
          nome,
          email,
          cpf,
          data_nascimento: new Date(data_nascimento),
          ativo: true,
          pontuacao_plataforma: 0,
          permissao_email,
          tag: "",
          genero: {
            connect: {
              id: id_genero,
            },
          },
        },
      });
  }

  static async findBy(name:string, value: string | number) : Promise<Usuario | null> {
  
      return await prisma.usuario.findFirst({
        where:{
         [name]: value,
        }})

  }

  static async updateDevInfo(
    biografia: string | undefined,
    nome: string | undefined,
    email: string | undefined,
    foto_perfil: string | undefined,
    link_github: string | undefined,
    link_portfolio: string | undefined,
    permissao_email: boolean | undefined,
    id_usuario: number,
    id_genero: number | undefined
  ) {
    return await prisma.usuario.update({
      where:{
        id: id_usuario
      },
      data:{
        nome: nome,
        email: email,
        foto_perfil: foto_perfil,
        link_github: link_github,
        link_portfolio: link_portfolio,
        permissao_email: permissao_email,
        biografia: biografia,
        idGenero: id_genero,
      }
    })
  }

  static async updateDevLogin(
    senha: string | undefined,
    id_login: number | undefined,
    id_usuario: number,
  ) {
    return prisma.loginUsuario.update({
      data:{
        senha: senha,
        usuario:{
          connect:{
            id: id_usuario
          }
        }
      },
      where:{
        id: id_login
      }
    })
  }

  static async updateDevPhone(
    ddd_telefone: string,
    numero_telefone: string,

    id_usuario_telefone: number | undefined,
    id_usuario: number,
    id_tipo_telefone: number
    ) {
      return await prisma.usuarioTelefone.upsert({
        update:{
          numero: numero_telefone,
          ddd: ddd_telefone,
          idTipoTelefone: id_tipo_telefone
        },
        create:{
          numero: numero_telefone,
          ddd: ddd_telefone,
          idTipoTelefone: id_tipo_telefone,
          idUsuario: id_usuario
        },
        where:{
          id: id_usuario_telefone
        }
      })
  }

  static async updateDevAddress(
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    id_cidade: number | undefined,
    id_usuario: number,
    id_estado: number | undefined,
    id_usuario_endereco: number | undefined,
    logradouro: string,
    numero_rua: string,
    complemento: string | undefined,
  ) {
    return await prisma.enderecoUsuario.upsert({
      create:{
        usuario:{
           connect:{
            id: id_usuario
           }
        },
        bairro: bairro,
        numero: numero_rua,
        logradouro: logradouro,
        cep: cep,
        complemento: complemento || null,
        cidade:{
          connectOrCreate:{
            create:{
              nome: cidade,
              estado:{
                create:{
                  nome: estado
                }
              }
            },
            where:{
              id: id_cidade
            }
          }
        }
      },
      update:{
        cidade:{
          connectOrCreate:{
            create:{
              nome: cidade,
              estado:{
                connectOrCreate:{
                  create:{
                    nome: estado
                  },
                  where:{
                    id: id_estado
                  }
                }
              }
            },
            where:{
              id: id_cidade
            }
          }
        },
        bairro: bairro,
        numero: numero_rua,
        logradouro: logradouro,
        cep: cep,
        complemento: complemento || null
      },
      where:{
        id: id_usuario_endereco
      }
    })
  }

  static async getUserInfo(id: number) {
    return await prisma.usuario.findFirst({
      where: {
        id: id
      },
      include:{
        usuarioStack: {
          select:{
            stack:{
              select:{
                id: true,
                nome: true,
              }
            }
          }
        },
        usuarioHabilidade: {
          select:{
            idHabilidade: true,
            habilidade: true,
          }
        },
        EnderecoUsuario: {
          select:{
            logradouro: true,
            numero: true,
            bairro: true,
            cidade: {
              select:{
                id: true,
                nome: true,
              }
            },
            complemento: true,
          }
        },
        UsuarioTelefone: {
          select:{
            ddd: true,
            numero: true,
            tipoTelefone:{
              select:{
                nome: true
              }
            }
          }
        },
        genero: {
          select:{
            id: true,
            nome: true,
          }
        },
        usuarioProva: {
          select:{
            id: true,
            pontuacao: true,
            provaAndamento:{
              select:{
                id: true,
                prova:{
                  select:{
                    titulo: true,
                    descricao: true,
                    provaStack: {
                      select:{
                        idProvaStack: true,
                        stack: true,
                      }
                    },
                    provaHabilidade:{
                      select:{
                        idHabilidade: true,
                        habilidade: true,
                      }
                    },
                  }
                }
              }
            }
          }
        },
        usuarioTesteCompetencia: {
          select: {
            id: true,
            pontuacao: true,
            testeCompetencia: {
              select:{
                id: true,
                titulo: true,
                descricao: true,
                testeCompetenciaHabilidade: {
                  select:{
                    idHabilidade: true,
                    habilidade: true
                  }
                },
              }
            }
          }
        },
      }
    })
  }

  static async relatePhone({
    ddd,
    numero,
    id_tipo,
    id_usuario
  } : PhoneData) : Promise<UsuarioTelefone> {

      return await prisma.usuarioTelefone.create({
        data: {
          ddd,
          numero,
          tipoTelefone: {
            connect: {
              id: id_tipo
            }
          },
          usuario:{
            connect: {
              id: id_usuario
            }
          }
        },
      });
        
  }

  static async relateStacks({
    id_usuario,
    id_stack
  } : DeveloperStacks) : Promise<UsuarioStack> {
      
      return await prisma.usuarioStack.create({
        data:{
          idUsuario: id_usuario,
          idStack: id_stack,
        }});

  }

  static async relateSkills({
    id_usuario,
    id_habilidade,
  }: DeveloperSkills) : Promise<UsuarioHabilidade> {

      return await prisma.usuarioHabilidade.create({
        data:{
          idUsuario: id_usuario,
          idHabilidade: id_habilidade,
        }});

  }

  static async createLogin(password: string, id_usuario: number) : Promise<LoginUsuario> {
      return await prisma.loginUsuario.create({
        data: {
          senha: password,
          idUsuario: id_usuario
        },
      });   
  }

  static async findLogin(id_usuario: number) : Promise<LoginUsuario | null> {
      return await prisma.loginUsuario.findFirst({
        where:{
          idUsuario: id_usuario
        }
      })
  }

  static async updatePassword(id: number, password : string) : Promise<LoginUsuario> {
    return await prisma.loginUsuario.update({
      data:{
        senha: password,
      },
      where: {
        id: id
      }
    })
  } 

  static async testSearch(search: string) : Promise<ProvaAndamento | any>{
    return await prismaClient.provaAndamento.findMany({
      select:{
        id: true,
        empresa:{
          select:{
            id: true,
            nome_fantasia: true,
            logo: true,
          }
        },
        prova: {
          select:{
            provaHabilidade:{
              select:{
                habilidade:{
                  select:{
                    nome: true
                  }
                }
              }
            },
            descricao:true,
            titulo: true,
            ativo: true,
            
            provaStack:{
              select:{
                stack:{
                  select:{
                    nome: true
                  }
                }
              }
            }
          },
        
        },
        
        
      },
      where:{
       OR:[
        {
          prova:{
            provaStack:{
              some:{
                stack:{
                  nome:{
                    contains: search
                  }
                }
              }
            },
          }
        },
        {
          prova:{
            provaHabilidade:{
              some:{
                habilidade:{
                  nome:{
                    contains: search
                  }
                }

              }

            }
          }
        },
        {
          prova:{
            provaAndamento:{
              some:{
                prova:{
                  titulo:{
                    contains: search
                  }
                }
              }
            }
          }
        }
       ]
      },
      orderBy:{
        id: 'desc'
      }
    })
  }
  static async searchTestUser(search: string){
    return await prismaClient.usuarioProva.findMany({
      select:{
        provaAndamento: true,
        id: true

      },
      where:{
        provaAndamento:{
          usuarioProva:{
            some:{
              usuario:{
                nome: {
                  contains: search
                }
              }
            }
          }
        }
      }
    })
  }

 
}
