export default interface filter{
    pagina: number,
    resultados?: number,
    
    tipo?: string,
    ids_stacks?: number[] | number,
    ids_habilidades?: number[] | number
}