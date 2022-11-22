export default interface TestProgress {
    id_empresa: number,
    id_prova: number,

    link_repositorio?: string,
    data_inicio: string;
    data_fim: string,
    duracao?: string,
 }