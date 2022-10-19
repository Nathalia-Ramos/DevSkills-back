import Question from "../../interfaces/Question/Question";

export default interface Test{
    //id é apenas um teste
    id: number,
    titulo: string,
    //id_criador: number,
    tipo_criador: "ADMIN"| "EMPRESA",
    descricao: string,
    link_repositorio?: string,
    idProvaTipo: number,
    
   /* data_inicio: string,
    data_fim: string,
    duracao: string,
    
    ids_habilidades: number[],
    ids_stacks: number[],
    
    questoes: Question[],*/
    
}



