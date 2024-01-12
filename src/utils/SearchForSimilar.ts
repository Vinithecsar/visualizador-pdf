import { ApiExam } from "@/app/page";

export function SearchForSimilar(ApiExams: ApiExam[], name: string) {
  const similarExams = ApiExams.filter((exam) => {
    const exameDaApi = exam.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const nomeRecebido = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return exameDaApi.includes(nomeRecebido);
  });

  similarExams.unshift({
    id: "?",
    nome: "Escolha um exame",
  });
  return similarExams;
}
