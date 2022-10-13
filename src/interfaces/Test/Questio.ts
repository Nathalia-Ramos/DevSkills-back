import Option from "./Option"

export default interface Question {
    
    enunciado: string,
    foto?: string,
    
    id_tipo: number,
    tipo: "UNICA_ESCOLHA" | "MULTIPLA_ESCOLHA" | "DISSERTATIVA",
    
    alternativas?: Option[]
}
