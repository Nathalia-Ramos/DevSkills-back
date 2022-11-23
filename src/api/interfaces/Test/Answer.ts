interface testCorrection {
    id_prova_usuario: number,
    questoesCorrigidas: correctAnswer[]
}

interface correctAnswer{
    id_questao: number,
    correta: boolean
}

export { testCorrection, correctAnswer }