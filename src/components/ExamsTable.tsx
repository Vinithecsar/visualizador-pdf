import { ApiExam } from "@/app/page";
import ExamsTableData from "./ExamsTableData";
import { MutableRefObject } from "react";

export default function ExamsTableTest(props: {
  resultExams: { idNome: string; nome: string }[];
  apiExams: ApiExam[];
  examsResultsRef: MutableRefObject<
    {
      id: string;
      nome: string;
      exameEscolhido: ApiExam | null;
    }[]
  >;
}) {
  return (
    <table className="table-auto border border-black">
      <thead>
        <tr className="bg-slate-300">
          <th className="border border-black px-2 py-1">Nome identificado</th>
          <th className="border border-black px-2">Código</th>
          <th className="border border-black px-2">Nome Softlab</th>
          <th className="border border-black px-2">Mnemônico Softlab</th>
          <th className="border border-black px-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {props.resultExams?.map((exam, index) => {
          return (
            <ExamsTableData
              exam={exam}
              apiExams={props.apiExams}
              index={index}
              examsResultsRef={props.examsResultsRef}
              key={exam.idNome}
            />
          );
        })}
      </tbody>
    </table>
  );
}
