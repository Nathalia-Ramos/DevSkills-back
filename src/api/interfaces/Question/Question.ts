import Option from "../Options/Options"

export default interface Question{
  
    enunciado: string,
    img_url?: string,
       
    id_tipo: number,
    tipo: "UNICA_ESCOLHA" | "MULTIPLA_ESCOLHA" | "DISSERTATIVA",
       
    alternativas?: Option[]   
}