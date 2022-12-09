interface devProfile {
    biografia: string | undefined,
    senha: string | undefined,
    nome: string | undefined,
    tag: string | undefined,
    email: string | undefined,
    foto_perfil: string | undefined,
    link_github: string | undefined,
    link_portfolio: string | undefined,
    permissao_email: boolean | undefined,

    ddd_telefone: string | undefined,
    numero_telefone: string | undefined,
    id_usuario_telefone: number | undefined,
    id_tipo_telefone: number | undefined,

    logradouro: string | undefined,
    numero_rua: string | undefined,
    cep: string | undefined,
    bairro: string | undefined,
    cidade: string | undefined,
    estado: string | undefined,
    complemento: string | undefined,
    id_cidade: number | undefined,
    id_estado: number | undefined,
    id_usuario_endereco: number | undefined,

    id_genero: number | undefined,
    ids_stacks: number[] | undefined,
    ids_habilidades: number[] | undefined
}

interface updateDev {
    biografia: string | undefined,
    nome: string | undefined,
    email: string | undefined,
    tag: string | undefined,
    foto_perfil: string | undefined,
    link_github: string | undefined,
    link_portfolio: string | undefined,
    permissao_email: boolean | undefined,

    id_usuario: number,
    id_genero?: number | undefined,
}

interface updateAddress {
    logradouro: string,
    numero_rua: string,
    cep: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento?: string | undefined,
    
    id_usuario: number,
    id_cidade: number | undefined,
    id_estado: number | undefined,
    id_usuario_endereco: number | undefined,
}

interface updatePhone {
    ddd_telefone: string | undefined,
    numero_telefone: string | undefined,

    id_usuario_telefone: number | undefined,
    id_tipo_telefone: number,
    id_usuario: number,
}

interface updateLogin {
    senha: string | undefined,
    id_login: number | undefined,
    id_usuario: number,
}

export { devProfile, updateAddress,updateDev, updateLogin, updatePhone } 