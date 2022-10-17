import Option from "../Options/Options"

export default interface Question{
    id: number,
    enunciado: string,
    img_url?: string,
       
    id_tipo: number,
       
    alternativas?: Option[]   
}