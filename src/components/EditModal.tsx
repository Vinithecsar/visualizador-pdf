import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import Button from "./Button";
import { ApiExam } from "@/app/page";
import { SearchForSimilar } from "@/utils/SearchForSimilar";
import { CloseIcon } from "@/icons";
import { Dialog } from "@headlessui/react";

export default function EditModal(props: {
  isOpen: boolean;
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
  }, [props.apiExams, props.examsToChoose]);

  useEffect(() => {
    const similar = SearchForSimilar(props.apiExams, termoPesquisa);
    setAvailableExams(similar);
  }, [props.apiExams, termoPesquisa]);

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
    <>
      <Dialog
        as="div"
        open={props.isOpen}
        className="relative z-10"
        onClose={props.onClose}
      >
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <div className="ml-auto mr-[-20px] mt-[-20px] flex items-center">
                <Dialog.Title
                  as="h3"
                  className="w-[90%] text-center text-lg font-medium leading-6 text-gray-900"
                >
                  Editar exame
                </Dialog.Title>
                <Button onClick={props.onClose} className="w-[10%] bg-red-500">
                  {CloseIcon}
                </Button>
              </div>

              <div className="mt-4 items-center">
                <input
                  type="text"
                  placeholder="Digite o nome do exame                             🔎"
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full rounded-sm bg-gray-100 px-2 text-lg text-black"
                />
              </div>
              <div className="mt-2">
                <select
                  value={"default"}
                  name="exam"
                  id="exams"
                  onChange={(e) => {
                    props.onChosen(e.target.value);
                    props.onClose();
                  }}
                  className="w-full bg-gray-100 px-2 text-black"
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
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
