export default interface DeveloperData {
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    confirmar_senha: string,
    data_nascimento: string, // ANO/MES/DIA
    permissao_email: boolean,

    ddd: string,
    numero: string,
    id_tipo_telefone: number,

    id_genero: number,

    ids_stacks: number[] | null,
    ids_habilidades: number[] | null,
}