import { PrismaClient, Usuario, LoginUsuario, UsuarioHabilidade, UsuarioStack, UsuarioTelefone, Empresa, Prova, ProvaAndamento, Cidade, Estado } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import DeveloperData from "../../interfaces/Developer/Developer";
import PhoneData from "../../interfaces/Developer/DeveloperPhone";
import DeveloperStacks from "../../interfaces/Developer/DeveloperStacks";
import DeveloperSkills from "../../interfaces/Developer/DeveloperSkills";
import {updateAddress, updateDev, updatePhone, updateLogin, devProfile} from "../../interfaces/Developer/DeveloperProfile"
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

  static async updateDevInfo({
    biografia,
    nome,
    email,
    foto_perfil,
    link_github,
    link_portfolio,
    permissao_email,
    id_usuario,
    id_genero,
  } : updateDev) {
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

    id_usuario_telefone: number,
    id_tipo_telefone: number,
    id_usuario: number,
    ) {
      return await prisma.usuarioTelefone.update({
        data:{
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

  static async createDevPhone(
    ddd_telefone: string,
    numero_telefone: string,

    id_tipo_telefone: number,
    id_usuario: number,
    ) {
      return await prisma.usuarioTelefone.create({
        data:{
          numero: numero_telefone,
          ddd: ddd_telefone,
          idTipoTelefone: id_tipo_telefone,
          idUsuario: id_usuario
        }
      })
  }

  static async updateDevAddress(
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    logradouro: string,
    numero_rua: string,
    complemento: string | undefined,
    id_cidade: number | undefined,
    id_estado: number | undefined,
    id_usuario_endereco: number | undefined,
  ) {
    return await prisma.enderecoUsuario.update({
      data:{
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
        }
      },
      where:{
        id: id_usuario_endereco
      }
    })
  }

  static async findState(
    nome: string
  ) : Promise<Estado | null> {
    return await prisma.estado.findFirst({
      where:{
        nome: {
          equals: nome
        }
      }
    })
  }

  static async findCity(
    nome: string
  ) : Promise<Cidade | null> {
    return await prisma.cidade.findFirst({
      where:{
        nome: {
          equals: nome
        }
      }
    })
  }

  static async createDevAddress(
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    logradouro: string,
    numero_rua: string,
    complemento: string | undefined,
    id_usuario: number,
    id_cidade: number | undefined,
    id_estado: number | undefined,
  ) {
    return await prisma.enderecoUsuario.create({
      data:{
        bairro: bairro,
        numero: numero_rua,
        logradouro: logradouro,
        cep: cep,
        complemento: complemento || null,
        usuario:{
          connect: {
            id: id_usuario
          }
        },
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
        }
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
            id: true,
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
            id: true,
            ddd: true,
            numero: true,
            tipoTelefone:{
              select:{
                id: true,
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

  static async deleteStacks(
    id_usuario: number) {
      return await prisma.usuarioStack.deleteMany({
        where:{
          idUsuario: id_usuario
        }
      })
  }

  static async deleteSkills(
    id_usuario: number) {
      return await prisma.usuarioStack.deleteMany({
        where:{
          idUsuario: id_usuario
        }
      })
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
  static async getAllUsers(){
    return await prismaClient.usuario.findMany({
      select:{
        id: true,
        email: true,
        foto_perfil: true
      }
    })
  }

 
}
