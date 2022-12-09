interface candidateData {
    id_prova_usuario: number,
    id_prova_andamento: number,
    duracao: string | null,
    finalizada: boolean,
    corrigida: boolean,
    pontuacao: number | null,  
    porcentagemAcertos: string | null,
    candidato: {
      id: number;
      nome: string;
      email: string;
      foto_perfil: string | null;
      idade: number;
      localidade: {
        estado: string | null;
        cidade: string | null;
      }
  };
}

export { candidateData }