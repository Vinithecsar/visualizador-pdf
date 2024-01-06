import { ApiExam } from "@/app/page";

export function SearchForSimilar(ApiExams: ApiExam[], name: string) {
  const similarExams = ApiExams.filter((exam) => {
    return exam.nome.toLowerCase().includes(name.toLowerCase());
  });

  similarExams.unshift({
    id: "?",
    nome: "Escolha um exame",
  });
  return similarExams;
}
