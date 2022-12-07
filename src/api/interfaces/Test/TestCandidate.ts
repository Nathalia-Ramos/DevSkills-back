interface candidateData {
    id_prova_usuario: number,
    id_prova_andamento: number,
    duracao?: string,
    finalizada: boolean,
    pontuacao: number,  
    candidato: {
      id: number;
      nome: string;
      email: string;
      foto_perfil: string | null;
      idade: number;
  };
}

export { candidateData }