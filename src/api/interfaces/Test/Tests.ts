 
interface TestData {
    id: number,
    titulo: string,
    id_criador: number,
    tipo_criador: "ADMIN"| "EMPRESA",
    descricao: string,
    link_repositorio?: string,
  
    data_inicio: string,
    data_fim: string,
    duracao: string,
  
    id_prova_tipo: number,    
    id_tipo_prova: "TEORICA" | "PRATICA"
    ids_habilidades: number[],
    ids_stacks: number[],
  
    questoes: Question[],
 }
 interface Question {
    id: number,
    enunciado: string,
    img_url?: string,
  
    id_tipo: number,
    tipo?: "DISSERTATIVA" | "MULTIPLA_ESCOLHA" | "UNICA_ESCOLHA"
    alternativas?: Option[]
 }
 //opcoes que a empresa cadastrou : tblalternativa_prova
 interface Option {
    texto: string,
    correto: boolean
    id_questao: number
 }
  
export  {TestData, Question, Option} 