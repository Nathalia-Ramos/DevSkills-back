interface userTest {
    id_usuario: number,
    id_prova_andamento: number,

    data_inicio: string,
    data_entrega: string,
    finalizada: boolean,

    respostas?: userAnswer[]
}

interface userAnswer {
    id_questao: number,

    id_alternativa?: number | number[],
    resposta?: string
}

// interface updateUserTest {
//     id_prova_usuario: number,
//     finalizada: boolean,
//     data_entrega: string
// }

// interface choiceInfos {
//     id_prova_usuario: number,
//     id_questao: number,
//     id_alternativa: number
// }

// interface textInfos {
//     id_prova_usuario: number,
//     id_questao: number,
//     resposta: string
// }

export { userAnswer, userTest }