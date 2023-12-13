"use client";

import Button from "@/components/Button";
import { useState } from "react";

export interface Exam {
  success?: boolean;
  code: number;
  name: string;
}

export default function Home() {
  const [selectedFile, SetSelectedFile] = useState<File>();
  const [selectedFileUrl, SetSelectedFileUrl] = useState<string>();
  const [resultExams, setResultExams] = useState<Exam[]>();

  const handleFileChange = (e: any) => {
    setResultExams(undefined);
    SetSelectedFile(e.target.files[0]);
    let objectURL = URL.createObjectURL(e.target.files[0]);
    SetSelectedFileUrl(objectURL);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const data = new FormData();
      data.set("file", selectedFile);

      const res = await fetch("/api/uploadExams", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const exams = await res.json();
      setResultExams(exams);
      console.log(exams);
    } catch (e: any) {
      console.error(e);
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
            accept=".pdf"
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
            <iframe src={selectedFileUrl} className="w-full" height={800} />
          ) : (
            <div className="flex h-[800px] items-center justify-center">
              <p className="text-black">Nenhum PDF foi selecionado!</p>
            </div>
          )}
        </div>
        <div className="w-1/3 rounded-md bg-[#2E8752]">
          <h1 className="p-2 text-center text-lg font-semibold">
            Exames resultantes:
          </h1>
          {resultExams === undefined || resultExams[0].success === false ? (
            <p className="p-2 text-center">Exames ainda não identificados</p>
          ) : (
            <div className="flex justify-center overflow-auto">
              <table className="table-auto border">
                <thead>
                  <tr>
                    <th className="border px-2">Código</th>
                    <th className="border">Nome</th>
                  </tr>
                </thead>
                <tbody>
                  {resultExams.map((exam, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">{exam.code}</td>
                        <td className="max-w-[300px] break-words border-l px-5">
                          {exam.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
