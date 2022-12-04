interface Grupos {
    nome: string,
    status: boolean
    descricao: string,
    candidatos: UsuarioGrupo[],
    idProvaAndamento?: ProvasGrupos[]
 }
 interface UsuarioGrupo{
    idGrupo: number[]
    idUsuario: number[]
 }
 interface ProvasGrupos{
    idProvandamento?: number[]
    idGrupo: number[]
 }
 export {Grupos, UsuarioGrupo, ProvasGrupos}

  

 
 