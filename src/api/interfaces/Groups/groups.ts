interface Grupos {
    id: number,
    nome: string,
    status: boolean
    descricao: string,
    candidatos: UsuarioGrupo[],
    id_prova_andamento?: ProvasGrupos[] | any
 }
 interface UsuarioGrupo{
    idGrupo: number[] | any
    idUsuario: number[] |any
 }
 interface ProvasGrupos{
    idProvaAndamento?: number[] | any
    idGrupo?: number[] | any
 }
 
 export {Grupos, UsuarioGrupo, ProvasGrupos}

  

 
 