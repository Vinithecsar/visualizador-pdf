"use client";

import Button from "@/components/Button";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Home() {
  const [selectedFile, SetSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, SetSelectedFileUrl] = useState<string>("");
  const [resultExams, setResultExams] = useState<string[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: any) => {
    setResultExams([]);
    SetSelectedFile(e.target.files[0]);
    let objectURL = URL.createObjectURL(e.target.files[0]);
    SetSelectedFileUrl(objectURL);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    SetIsLoading(true);

    try {
      const data = new FormData();
      data.set("file", selectedFile);

      const res = await fetch("/api/uploadExams", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const exams = await res.json();
      setResultExams(exams.listaExames);
      console.log(exams);
    } catch (e: any) {
      console.error(e);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="container mx-6 mb-2 mt-6 flex items-center rounded-md bg-[#D9D9D9]">
        <div className="m-auto text-center text-black">
          <h1>Enviar arquivo PDF</h1>
          <input
            type="file"
            id="pdfFile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Button className="bg-blue-500">
          <label className="cursor-pointer" htmlFor="pdfFile">
            Carregar arquivo
          </label>
        </Button>
        <Button onClick={handleUpload}>
          <p>Enviar</p>
        </Button>
      </div>

      {/* Corpo */}
      <div className="container mx-6 flex">
        <div className="mr-2 w-2/3 rounded-md bg-[#D9D9D9]">
          {selectedFileUrl ? (
            <iframe src={selectedFileUrl} className="w-full" height={852} />
          ) : (
            <div className="flex h-[800px] items-center justify-center">
              <p className="text-black">Nenhum PDF foi selecionado!</p>
            </div>
          )}
        </div>
        <div className="w-1/3 rounded-md bg-[#2E8752]">
          <h1 className="p-2 text-center text-lg font-semibold">
            {resultExams.length === 0 ? null : resultExams.length} Exames
            resultantes:
          </h1>

          {resultExams.length === 0 ? (
            <p className="p-2 text-center">Exames ainda não identificados</p>
          ) : (
            <>
              <Loading isLoading={isLoading} />
              <div className="mb-2 flex max-h-[800px] justify-center overflow-y-auto">
                <table className="table-auto border">
                  <thead>
                    <tr>
                      <th className="border px-2">Código</th>
                      <th className="border">Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultExams?.map((exam, index) => {
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
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
