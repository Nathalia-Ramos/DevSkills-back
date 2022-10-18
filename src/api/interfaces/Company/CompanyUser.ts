export default interface CompanyData {
    [x: string]: any
   
    cnpj: string,
    email: string,
    nome_fantasia:string,
    senha?: string,
    confirmar_senha?: string,


    ddd?: string,
    numero_telefone?: string,
  
    cidade?: string,
    bairro?: string,
    logradouro?: string,
    numero_rua?: string,
    complemento?: string,
    cep?: string
    
}

