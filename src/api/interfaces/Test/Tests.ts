interface TestData {
    titulo: string,
    id_criador: number,
    tipo_criador: "ADMIN"| "EMPRESA",
    descricao: string,
    link_repositorio?: string,
  
    data_inicio: string;
    data_fim: string,
    duracao: string,
  
    tipo_prova: "TEORICA" | "PRATICA"
    ids_habilidades: number[],
    ids_stacks: number[],
  
    questoes: Question[],
 }
 
 interface Question {
    enunciado: string,
    img_url?: string,
  
    id_tipo: number,
    tipo?: "DISSERTATIVA" | "MULTIPLA_ESCOLHA" | "UNICA_ESCOLHA"
    alternativas?: Option[]
 }

 interface Option {
    texto: string,
    correta: boolean
 }
  
export {TestData, Question, Option} 