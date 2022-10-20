export default interface CompanyData {
    [x: string]: any
   
    cnpj: string,
    email: string,
    nome_fantasia:string,
    senha?: string,
    confirmar_senha?: string,
    idEndereco?: any

    ddd?: string,
    numero_telefone?: string,
    idEmpresa?:number

    cidade?: string,
    idEstado?: number
    bairro?: string,
    logradouro?: string,
    numero_rua?: string,
    complemento?: string,
    cep?: string
    
}

