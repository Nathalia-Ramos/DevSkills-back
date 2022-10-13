export default interface DeveloperData {
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    confirmar_senha: string,
    data_nascimento: string, // ANO/MES/DIA

    ddd: string,
    numero: string,
    id_tipo_telefone: number,

    id_genero: number,
    permissao_email: boolean,

    ids_stacks: Array<number>,
    ids_habilidades: Array<number>
}