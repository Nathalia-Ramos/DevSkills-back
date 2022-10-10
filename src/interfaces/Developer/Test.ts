export default interface TestData {
    título: string,
    descrição: string,
    link_repositorio?: string,

    id_tipo: number,
    ids_habilidades: Array<number>,
    ids_stacks: Array<number>,

    questoes: [Array<Object>],
}