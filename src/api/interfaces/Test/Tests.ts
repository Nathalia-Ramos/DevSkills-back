import Question from "../Question/Question";

export default interface Test {
    id:number
    titulo: string,
    id_criador: number,
    tipo_criador?: "ADMIN"| "EMPRESA",
    descricao: string,
    link_repositorio?: string,
    id_tipo: number,
    ultima_atualizacao: string
  
    /*data_inicio: string,
    data_fim: string,
    duracao: string,
  
    ids_habilidades: number[],
    ids_stacks: number[],
  
    questoes?: Question[],*/
 
}
  

 
