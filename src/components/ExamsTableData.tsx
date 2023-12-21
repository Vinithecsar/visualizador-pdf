import { ApiExam } from "@/app/page";
import { ChangeEvent, useState } from "react";

export default function ExamsTableData({
  exam,
  index,
}: {
  exam: ApiExam[];
  index: number;
}) {
  const [chosenExam, SetChosenExam] = useState<ApiExam | null>(null);

  //   {
  //   id: "?",
  //   nome: "Escolha um exame",
  //   entrega: "sem entrega",
  //   instrucoes: "sem instrucoes",
  //   material: "sem material",
  //  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const findExam = exam.find((ex) => ex.id === id);
    SetChosenExam(findExam!);
  };

  return exam.length === 2 ? (
    <>
      <td className="max-w-[275px] break-words border">
        {exam[0].nomeIdentificado}
      </td>
      <td className="max-w-[90px] break-words border px-2">{exam[1].id}</td>
      <td className="max-w-[275px] break-words border p-1">{exam[1].nome}</td>
      <td className="max-w-[90px] break-words border px-2">{exam[1].id}</td>
    </>
  ) : !chosenExam ? (
    <>
      <td className="max-w-[275px] break-words border">
        {exam[0].nomeIdentificado}
      </td>
      <td className="max-w-[90px] break-words border px-2">?</td>
      <td className="max-w-[275px] break-words border p-1">
        <select
          name="exam"
          id="exams"
          className={`max-w-[259px] text-center ${
            index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
          }`}
          onChange={onSelectChange}
        >
          {exam.map((exam) => {
            return (
              <option key={exam.id} value={exam.id}>
                {exam.nome}
              </option>
            );
          })}
        </select>
      </td>
      <td className="max-w-[90px] break-words border px-2">?</td>
    </>
  ) : (
    <>
      <td className="max-w-[275px] break-words border">
        {exam[0].nomeIdentificado}
      </td>
      <td className="max-w-[90px] break-words border px-2">{chosenExam.id}</td>
      <td className="max-w-[275px] break-words border p-1">
        {chosenExam.nome}
      </td>
      <td className="max-w-[90px] break-words border px-2">{chosenExam.id}</td>
    </>
  );
}
