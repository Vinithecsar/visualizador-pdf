import { ApiExam } from "@/app/page";
import { v4 } from "uuid";
import ExamsTableData from "./ExamsTableData";
import { MutableRefObject, useEffect } from "react";

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
    <table className="table-auto border">
      <thead>
        <tr className="bg-blue-950">
          <th className="border px-2 py-1">Nome identificado</th>
          <th className="border px-2">Código</th>
          <th className="border px-2">Nome Softlab</th>
          <th className="border px-2">Mnemônico Softlab</th>
          <th className="border px-2">Ações</th>
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
              key={v4()}
            />
          );
        })}
      </tbody>
    </table>
  );
}
