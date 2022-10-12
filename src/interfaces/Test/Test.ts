import Question from "./Questio";

export default interface Test{
    //id é apenas um teste
    id: number,
    titulo: string,
    id_criador: number,
    tipo_criador: "ADMIN"| "EMPRESA",
    descricao: string,
    link_repositorio?: string,
    
    data_inicio: string,
    data_fim: string,
    duracao: string,
    
    id_tipo: number,
    ids_habilidades: number[],
    ids_stacks: number[],
    
    questoes: Question[],
    
}



