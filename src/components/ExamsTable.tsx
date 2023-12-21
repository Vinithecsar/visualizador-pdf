import { ApiExam } from "@/app/page";
import ExamsTableData from "./ExamsTableData";

export default function ExamsTable(props: { resultExams: ApiExam[][] }) {
  return (
    <table className="table-auto border">
      <thead>
        <tr className="bg-blue-950">
          <th className="border px-2 py-1">Nome identificado</th>
          <th className="border px-2">Código</th>
          <th className="border px-2">Nome Softlab</th>
          <th className="border px-2">Mnemônico Softlab</th>
        </tr>
      </thead>
      <tbody>
        {props.resultExams?.map((exam, index) => {
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
              } text-center`}
            >
              <ExamsTableData exam={exam} index={index} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
