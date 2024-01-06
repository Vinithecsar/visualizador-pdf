import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./Button";
import { ApiExam } from "@/app/page";
import { SearchForSimilar } from "@/utils/SearchForSimilar";
import { CloseIcon, SearchIcon } from "@/icons";

export default function AddOrEditModal(props: {
  examsToChoose: ApiExam[];
  apiExams: ApiExam[];
  onClose: () => void;
  onChosen: (id: string) => void;
}) {
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");
  const [availableExams, setAvailableExams] = useState<ApiExam[]>([]);

  useEffect(() => {
    if (props.examsToChoose.length > 2) {
      setAvailableExams(props.examsToChoose);
    } else {
      setAvailableExams(props.apiExams);
    }
  }, []);

  const onSearch = () => {
    const similar = SearchForSimilar(props.apiExams, termoPesquisa);
    setAvailableExams(similar);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      const similar = SearchForSimilar(props.apiExams, termoPesquisa);
      setAvailableExams(similar);
    }
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center backdrop-blur-[1px]">
      <div className="fixed top-1/4 m-auto flex h-[18%] w-[22%] flex-col items-center justify-center rounded-lg bg-blue-500">
        <div className="ml-auto flex items-center">
          <p className="pr-24 text-lg font-bold">Editar exame</p>
          <Button onClick={props.onClose} className="bg-red-500">
            {CloseIcon}
          </Button>
        </div>

        <div className="ml-auto mt-2 flex items-center">
          <input
            type="text"
            placeholder="Digite o nome do exame"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            onKeyDown={handleKeyPress}
            className="mr-6 rounded-sm px-2 text-lg text-black"
          />
          <Button onClick={onSearch}>{SearchIcon}</Button>
        </div>

        <div className="mt-2 pl-2 text-center">
          <select
            value={"default"}
            name="exam"
            id="exams"
            onChange={(e) => {
              props.onChosen(e.target.value);
              props.onClose();
            }}
            className="w-[80%] text-center text-black"
          >
            <option value="default" hidden disabled>
              Escolha um exame
            </option>
            {availableExams.map((ex, ind) => {
              if (ind !== 0) {
                return (
                  <option key={ex.id} value={ex.id}>
                    {ex.nome}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
