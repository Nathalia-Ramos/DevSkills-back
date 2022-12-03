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
    biografia?: string,
    nome?: string,
    email?: string,
    foto_perfil?: string,
    link_github?: string,
    link_portfolio?: string,
    permissao_email?: boolean,

    id_usuario: number,
    id_genero?: number,
}

interface updateAddress {
    logradouro?: string,
    numero_rua?: string,
    cep?: string,
    bairro?: string,
    cidade?: string,
    estado?: string,
    complemento?: string,
    
    id_usuario: number,
    id_cidade?: number,
    id_estado?: number,
    id_usuario_endereco?: number,
}

interface updatePhone {
    ddd_telefone?: string,
    numero_telefone?: string,

    id_usuario_telefone?: number,
    id_tipo_telefone?: number,
    id_usuario?: number,
}

interface updateLogin {
    senha?: string,
    id_login?: number,
    id_usuario: number,
}

export { devProfile, updateAddress,updateDev, updateLogin, updatePhone } 