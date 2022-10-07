export default interface CompanyData {
    cnpj: number,
    email: string,
    senha: string,
    confirmar_senha: string,
    nome_fantasia: string,

    ddd: string,
    numero_telefone: string,
    id_tipo_telefone: number,

    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero_rua: string,
    complemento?: string,
    cep: string,
}