interface answerData {
    idProvaAndamento: number,
    candidato: testAnswers[]
}

interface testAnswers {
    id: number,
    idProvaUsuario: number,
    nome: string,
    tempo: string,
    pontuacao: number | null,
    questoes: questionTest[]
}

interface questionTest {
    id: number,
    enunciado: string,
    tipo: string,
    acertou?: boolean,

    resposta?: questionAnswer,
    alternativas?: questionAnswer[],
}

interface questionAnswer {
    id: number,
    texto: string,
    correta?: boolean | null,
    selecionada?: boolean
}

export { answerData, testAnswers, questionAnswer, questionTest }  