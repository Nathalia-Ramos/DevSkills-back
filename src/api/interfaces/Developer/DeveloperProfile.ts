interface devProfile {
    biografia?: string,
    senha?: string,
    nome?: string,
    email?: string,
    foto_perfil?: string,
    link_github?: string,
    link_portfolio?: string,
    permissao_email?: boolean,

    ddd_telefone?: string,
    numero_telefone?: string,

    logradouro?: string,
    numero_rua?: string,
    cep?: string,
    bairro?: string,
    cidade?: string,
    estado?: string,
    complemento?: string,
    id_cidade?: number,
    id_estado?: number,
    id_usuario_endereco?: number,

    id_usuario: number,
    id_usuario_telefone?: number,
    id_tipo_telefone?: number,
    id_login?: number,
    id_genero?: number,
    ids_stacks?: number[],
    ids_habilidades?: number[]
}

interface updateDev {
    biografia: string | undefined,
    nome: string | undefined,
    email: string | undefined,
    foto_perfil: string | undefined,
    link_github: string | undefined,
    link_portfolio: string | undefined,
    permissao_email: boolean | undefined,

    id_usuario: number,
    id_genero?: number | undefined,
}

interface updateAddress {
    logradouro: string | undefined,
    numero_rua: string | undefined,
    cep: string | undefined,
    bairro: string | undefined,
    cidade: string | undefined,
    estado: string | undefined,
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
    id_tipo_telefone: number | undefined,
    id_usuario: number,
}

interface updateLogin {
    senha: string | undefined,
    id_login: number | undefined,
    id_usuario: number,
}

export { devProfile, updateAddress,updateDev, updateLogin, updatePhone } 