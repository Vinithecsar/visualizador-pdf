import { ApiExam } from "@/app/page";
import { ChangeEvent, useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

export default function ExamsTableData({
  exam,
  apiExams,
}: {
  exam: ApiExam[];
  apiExams: ApiExam[];
}) {
  const [chosenExam, SetChosenExam] = useState<ApiExam | null>(null);
  const [inputValue, SetInputValue] = useState<string>("");

  //   {
  //   id: "?",
  //   nome: "Escolha um exame",
  //   entrega: "sem entrega",
  //   instrucoes: "sem instrucoes",
  //   material: "sem material",
  //  }

  const onSelectChangeAll = (selectedOption: { value: string }) => {
    const id = selectedOption.value;
    const findExam = apiExams.find((ex) => ex.id === id);
    SetChosenExam(findExam!);
  };

  const onSelectChange = (selectedOption: { value: string }) => {
    const id = selectedOption.value;
    const findExam = exam.find((ex) => ex.id === id);
    SetChosenExam(findExam!);
  };

  const isUnidentified =
    exam[1].id === "?" || exam.length > 2 ? "bg-red-700" : null;

  const ExameUnico = () => {
    return (
      <>
        <td className="max-w-[275px] break-words border">
          {exam[0].nomeIdentificado}
        </td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          {exam[1].id}
        </td>
        <td className="max-w-[275px] break-words border p-1">{exam[1].nome}</td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          {exam[1].id}
        </td>
      </>
    );
  };

  const SelectVariosExames = () => {
    return (
      <>
        <td className="max-w-[275px] break-words border">
          {exam[0].nomeIdentificado}
        </td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          ?
        </td>
        <td className="max-w-[275px] break-words border p-1 text-black">
          <Select
            options={exam.map((ex) => {
              return { value: ex.id, label: ex.nome };
            })}
            placeholder="Escolha um exame"
            isSearchable
            //@ts-ignore
            onChange={onSelectChange}
          />
          {/* <select
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
          </select> */}
        </td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          ?
        </td>
      </>
    );
  };

  const ExameEscolhido = () => {
    if (!chosenExam) {
      return;
    }

    return (
      <>
        <td className="max-w-[275px] break-words border">
          {exam[0].nomeIdentificado}
        </td>
        <td className="max-w-[90px] break-words border px-2">
          {chosenExam.id}
        </td>
        <td className="max-w-[275px] break-words border p-1">
          {chosenExam.nome}
        </td>
        <td className="max-w-[90px] break-words border px-2">
          {chosenExam.id}
        </td>
      </>
    );
  };

  const CriarExame = () => {
    return !chosenExam ? (
      <>
        <td className="max-w-[275px] break-words border">
          {exam[0].nomeIdentificado}
        </td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          {exam[1].id}
        </td>
        <td className="max-w-[275px] break-words border p-1 text-black ">
          <Select
            options={apiExams.map((ex) => {
              return { value: ex.id, label: ex.nome };
            })}
            placeholder="Coloque o nome de um exame"
            isSearchable
            //@ts-ignore
            onChange={onSelectChangeAll}
          />
        </td>
        <td
          className={`max-w-[90px] break-words border px-2 ${isUnidentified}`}
        >
          {exam[1].id}
        </td>
      </>
    ) : (
      <ExameEscolhido />
    );
  };

  return exam[0].nomeIdentificado === "Linha criada" ? (
    <CriarExame />
  ) : exam.length === 2 ? (
    <ExameUnico />
  ) : !chosenExam ? (
    <SelectVariosExames />
  ) : (
    <ExameEscolhido />
  );
}
