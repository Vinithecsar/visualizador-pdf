import { ApiExam } from "@/app/page";

export function SearchForSimilar(ApiExams: ApiExam[], name: string) {
  const similarExams = ApiExams.filter((exam) => {
    return exam.nome.toLowerCase().includes(name.toLowerCase());
  });

  similarExams.unshift({
    nomeIdentificado: name,
    id: "?",
    nome: "Escolha um exame",
    entrega: "sem entrega",
    instrucoes: "sem instrucoes",
    material: "sem material",
  });
  return similarExams;
}
