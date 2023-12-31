"use client";

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorMessage";
import { ConvertPdfToJpg } from "@/utils/ConvertPdfToJpg";
import useExams from "@/hooks/useExams";
import ExamsTable from "@/components/ExamsTable";
import { v4 } from "uuid";

export interface ApiExam {
  id: string;
  nome: string;
}

export default function Home() {
  const [selectedFile, SetSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, SetSelectedFileUrl] = useState<string>("");
  const [ApiExams, SetApiExams] = useState<ApiExam[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { resultExams, setResultExams } = useExams();

  const examsResultsRef = useRef<
    { id: string; nome: string; exameEscolhido: ApiExam | null }[]
  >([
    {
      id: "id-1",
      nome: "Exame teste",
      exameEscolhido: {
        id: "?",
        nome: "Exame teste softlab",
      },
    },
  ]);

  if (!resultExams || !setResultExams) {
    throw new Error("Erro ao carregar useExams");
  }

  useEffect(() => {
    const fetchExamesSoftlab = async () => {
      try {
        const resExams = await fetch(
          "https://api.dnacenter.com.br/api/exames",
          {
            cache: "force-cache",
          },
        );
        const exams = await resExams.json();
        SetApiExams(exams);
      } catch (e) {
        console.log("erro: ", e);
      }
    };

    fetchExamesSoftlab();
  }, []);

  const handleFileChange = async (e: any) => {
    if (!e.target.files[0]) return;

    const arquivo: File = e.target.files[0];

    if (arquivo.type !== "application/pdf") {
      setError("Apenas arquivos pdf são aceitos!");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    const objectURL = URL.createObjectURL(arquivo);
    const arquivoJpg = await ConvertPdfToJpg(objectURL);

    setResultExams!([]);
    SetSelectedFile(arquivoJpg);
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

      const examsAiResponse: { listaExames: string[] } = await res.json();
      const listaExames = examsAiResponse.listaExames.map((exame) => {
        return { idNome: v4(), nome: exame };
      });
      setResultExams(listaExames);
      examsResultsRef.current = listaExames.map((exam) => {
        return { id: exam.idNome, nome: exam.nome, exameEscolhido: null };
      });
    } catch (e: any) {
      console.error(e);
    } finally {
      SetIsLoading(false);
    }
  };

  const onAddClick = () => {
    const tempArray = [{ idNome: v4(), nome: "Linha Criada" }, ...resultExams];
    examsResultsRef.current.unshift({
      id: tempArray[0].idNome,
      nome: tempArray[0].nome,
      exameEscolhido: null,
    });
    setResultExams(tempArray);
  };

  return (
    <main className="flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="mx-6 mb-2 mt-6 flex w-[87.5%] items-center rounded-md bg-[#D9D9D9]">
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
      {isLoading ? <Loading /> : null}
      {error ? <ErrorComponent error={error} /> : null}

      <div className="mx-6 flex w-[87.5%]">
        <div className="mr-2 w-1/2 rounded-md bg-[#D9D9D9]">
          {selectedFileUrl ? (
            <iframe
              src={selectedFileUrl}
              className="aspect-video w-full"
              height={852}
            />
          ) : (
            <div className="flex h-[800px] items-center justify-center">
              <p className="text-black">Nenhum PDF foi selecionado!</p>
            </div>
          )}
        </div>
        <div className="w-1/2 rounded-md bg-[#2E8752]">
          <div className="flex justify-center">
            <div
              className="my-3 rounded-md bg-blue-950 p-2 hover:cursor-pointer"
              onClick={onAddClick}
            >
              + Adicionar linha
            </div>
            <h1 className="my-auto mr-24 p-2 text-center text-lg font-semibold">
              {resultExams?.length === 0 ? null : resultExams?.length} Exames
              resultantes:
            </h1>
          </div>

          {resultExams?.length === 0 ? (
            <p className="p-2 text-center">Exames ainda não identificados</p>
          ) : (
            <>
              <div className="mb-2 flex max-h-[800px] justify-center overflow-y-auto">
                <ExamsTable
                  resultExams={resultExams}
                  apiExams={ApiExams}
                  examsResultsRef={examsResultsRef}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
