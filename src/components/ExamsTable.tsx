export default function ExamsTable(props: { resultExams: string[] }) {
  return (
    <table className="table-auto border">
      <thead>
        <tr>
          <th className="border px-2">Código</th>
          <th className="border">Nome</th>
        </tr>
      </thead>
      <tbody>
        {props.resultExams?.map((exam, index) => {
          return (
            <tr key={index}>
              <td className="max-w-[90px] break-words border-b p-1 text-center">
                {exam}
              </td>
              <td className="max-w-[290px] break-words border-b border-l p-1 px-2">
                {exam}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
