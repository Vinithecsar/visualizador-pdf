import { ApiExam } from "@/app/page";
import useExams from "@/hooks/useExams";
import { DeleteIcon, EditIcon } from "@/icons";
import { SearchForSimilar } from "@/utils/SearchForSimilar";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import AddOrEditModal from "./AddOrEditModal";

export default function ExamsTableData({
  exam,
  apiExams,
  index,
}: {
  exam: string;
  apiExams: ApiExam[];
  index: number;
}) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [chosenExam, setChosenExam] = useState<ApiExam | null>(null);
  const [examsToChoose, setExamsToChoose] = useState<ApiExam[]>([
    {
      id: "?",
      nome: "Carregando",
    },
  ]);

  const { resultExams, setResultExams } = useExams();
  if (!resultExams || !setResultExams) {
    throw new Error("Erro ao carregar useExams");
  }

  // Carregar os exames com nome em comum ao recebido
  useEffect(() => {
    const similar = SearchForSimilar(apiExams, exam);
    setExamsToChoose(similar);
  }, []);

  const onSelectChange = (id: string) => {
    const findExam = apiExams.find((ex) => ex.id === id);
    setChosenExam(findExam!);
  };

  const onEdit = () => {
    setChosenExam(null);
    setIsOpen(true);
  };

  const onDelete = () => {
    const updatedExams = [...resultExams];
    updatedExams.splice(index, 1);
    setChosenExam(null);
    setExamsToChoose([]);
    setResultExams(updatedExams);
  };

  return (
    <>
      {modalIsOpen ? (
        <AddOrEditModal
          examsToChoose={examsToChoose}
          apiExams={apiExams}
          onChosen={onSelectChange}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
      <tr
        className={`${
          index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
        } text-center`}
      >
        <>
          {examsToChoose.length === 1 && !chosenExam ? (
            <>
              <td className="max-w-[275px] break-words border">{exam}</td>
              <td className={`max-w-[90px] break-words border bg-red-700 px-2`}>
                {examsToChoose[0].id}
              </td>
              <td className="max-w-[275px] break-words border bg-red-700 p-1">
                Exame não identificado
              </td>
              <td className={`max-w-[90px] break-words border bg-red-700 px-2`}>
                {examsToChoose[0].id}
              </td>
              <td className="border p-1">
                <button onClick={onEdit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </>
          ) : null}

          {examsToChoose.length === 2 && !chosenExam ? (
            <>
              <td className="max-w-[275px] break-words border">{exam}</td>
              <td className={`max-w-[90px] break-words border px-2 `}>
                {examsToChoose[1].id}
              </td>
              <td className="max-w-[275px] break-words border p-1">
                {examsToChoose[1].nome}
              </td>
              <td className={`max-w-[90px] break-words border px-2`}>
                {examsToChoose[1].id}
              </td>
              <td className="border p-1" key={v4()}>
                <button onClick={onEdit}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </>
          ) : null}

          {examsToChoose.length > 2 && !chosenExam ? (
            <>
              <td className="max-w-[275px] break-words border">{exam}</td>
              <td className={`max-w-[90px] break-words border bg-red-700 px-2`}>
                ?
              </td>
              <td className="max-w-[275px] break-words border p-1">
                <select
                  value={"default"}
                  name="exam"
                  id="exams"
                  className={`max-w-[259px] text-center ${
                    index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
                  }`}
                  onChange={(e) => onSelectChange(e.target.value)}
                >
                  <option value="default" hidden disabled>
                    Escolha um exame
                  </option>
                  {examsToChoose.map((ex, ind) => {
                    if (ind !== 0) {
                      return (
                        <option key={ex.id} value={ex.id}>
                          {ex.nome}
                        </option>
                      );
                    }
                  })}
                </select>
              </td>
              <td className={`max-w-[90px] break-words border bg-red-700 px-2`}>
                ?
              </td>
              <td className="border p-1">
                <button onClick={onEdit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </>
          ) : null}

          {chosenExam ? (
            <>
              <td className="max-w-[275px] break-words border">{exam}</td>
              <td className={`max-w-[90px] break-words border px-2`}>
                {chosenExam.id}
              </td>
              <td className="max-w-[275px] break-words border p-1">
                {chosenExam.nome}
              </td>
              <td className={`max-w-[90px] break-words border px-2`}>
                {chosenExam.id}
              </td>
              <td className="border p-1">
                <button onClick={onEdit}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </>
          ) : null}
        </>
      </tr>
    </>
  );
}
