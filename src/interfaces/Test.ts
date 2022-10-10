interface TestData {
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

interface Question {
    enunciado: string,
    img_url?: string,
    
    id_tipo: number,
    tipo: "UNICA_ESCOLHA" | "MULTIPLA_ESCOLHA" | "DISSERTATIVA",
    
    alternativas?: Option[]
}

interface Option {
    texto: string,
    correto: boolean,
}