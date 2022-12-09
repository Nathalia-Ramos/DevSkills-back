interface userInfo {
    nome: string,
    email: string,
    biografia: string,
    foto_perfil: string,
    link_github: string,
    link_portfolio: string,
    permissao_email: boolean,

    senha: string,
    
    ddd_telefone: string,
    numero_telefone: string,
}

interface userEditData {
    usuario: userInfo,

    id_usuario: number,
    id_usuario_telefone: number,
    id_tipo_telefone: number,
    id_login: number,
    id_genero: number,
}

export { userEditData, userInfo }