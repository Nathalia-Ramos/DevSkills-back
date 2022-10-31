interface userTest {
    id_usuario: number,
    id_prova_andamento: number,
    
    finalizada: boolean,
    data_entrega?: string,
    data_inicio?: string,
    
    respostas?: userAnswer[]
}

interface userAnswer {
    id_questao: number,

    id_alternativa?: number | number[],
    resposta?: string
}

export { userAnswer, userTest }