interface testDetails {
    id: number, 
    titulo: string,
    descricao: string,
    totalCandidatos: number,
    provaStacks: stacksTest[],
    provaHabilidades: skillsTest[]
}

interface stacksTest {
    id: number,
    nome: string   
}

interface skillsTest {
    id: number,
    nome: string,
    icone: string
}

export { skillsTest, stacksTest, testDetails }