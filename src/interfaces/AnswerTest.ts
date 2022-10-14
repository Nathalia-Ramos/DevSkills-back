interface userTest {
    id_usuario: number,
    id_prova_andamento: number,
    
    finalizada: boolean,
    data_entrega?: string,
    
    respostas?: userAnswer[]
}

interface userAnswer {
    id_questao: number,

    id_alternativa?: number,
    resposta?: string
}

export { userAnswer, userTest }