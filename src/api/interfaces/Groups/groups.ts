interface Grupos {
    id: number,
    nome: string,
    status: "ACEITO" | "NEGADO" | "EM ANALISE"
    descricao: string,
    candidatos: UsuarioGrupo[],
    id_prova_andamento?: ProvasGrupos[] | any
    convite:  any[]
    
 }
 interface UsuarioGrupo{
    idGrupo: number[] | any
    idUsuario: number[] |any
    idConvite: number[] | any
 }
 interface ProvasGrupos{
    idProvaAndamento?: number[] | any
    idGrupo?: number[] | any
 }
 
 export {Grupos, UsuarioGrupo, ProvasGrupos}

  

 
 