import { ApiExam } from "@/app/page";
import { v4 } from "uuid";
import ExamsTableData from "./ExamsTableData";

export default function ExamsTableTest(props: {
  resultExams: string[];
  apiExams: ApiExam[];
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
              key={v4()}
            />
          );
        })}
      </tbody>
    </table>
  );
}
