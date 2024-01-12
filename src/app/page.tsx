"use client";

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorMessage";
import { ConvertPdfToJpg } from "@/utils/ConvertPdfToJpg";
import useExams from "@/hooks/useExams";
import ExamsTable from "@/components/ExamsTable";
import { v4 } from "uuid";
import { RenameFile } from "@/utils/RenameFile";

export interface ApiExam {
  id: string;
  nome: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>("");
  const [apiExams, setApiExams] = useState<ApiExam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPdf, setIsPdf] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

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
        setApiExams(exams);
      } catch (e) {
        console.log("erro: ", e);
      }
    };

    fetchExamesSoftlab();
  }, []);

  const handleFileChange = async (e: any) => {
    if (!e.target.files[0]) return;

    const arquivo: File = e.target.files[0];

    if (
      arquivo.type !== "application/pdf" &&
      arquivo.type !== "image/jpg" &&
      arquivo.type !== "image/jpeg" &&
      arquivo.type !== "image/png"
    ) {
      setError("Apenas arquivos pdf/jpg/jpeg/png são aceitos!");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    const objectURL = URL.createObjectURL(arquivo);

    if (arquivo.type === "application/pdf") {
      const arquivoJpg = await ConvertPdfToJpg(objectURL);
      setSelectedFile(arquivoJpg);
      setIsPdf(true);
    } else {
      const arquivoRenomeado = RenameFile(arquivo);
      setSelectedFile(arquivoRenomeado);
      setIsPdf(false);
    }

    setResultExams([]);

    setSelectedFileUrl(objectURL);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const data = new FormData();
      data.set("file", selectedFile);

      const res = await fetch("/api/uploadExams", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const examsAiResponse: { listaExames: { [key: string]: string[] } } =
        await res.json();

      const listaExames: { idNome: string; nome: string }[] = Object.keys(
        examsAiResponse.listaExames,
      )
        .filter((exame) => exame.length !== 0)
        .map((exame) => {
          return { idNome: v4(), nome: exame };
        });
      setResultExams(listaExames);
      examsResultsRef.current = listaExames.map((exam) => {
        return { id: exam.idNome, nome: exam.nome, exameEscolhido: null };
      });
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
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
          <h1>Enviar arquivo de prescrição</h1>
          <input
            type="file"
            id="pdfFile"
            className="hidden"
            onChange={handleFileChange}
            accept="application/pdf,image/jpeg,image/jpg,image/png"
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
          {selectedFileUrl && isPdf ? (
            <iframe src={selectedFileUrl} className="w-full" height={852} />
          ) : (
            <>
              {selectedFileUrl ? (
                <iframe
                  srcDoc={`<img
                  src=${selectedFileUrl}
                  alt="imagem responsiva"
                  style="width: 100%; height: 100%;"
                />`}
                  className="w-full"
                  height={852}
                ></iframe>
              ) : (
                <div className="flex h-[800px] items-center justify-center">
                  <p className="text-black">Nenhum arquivo foi selecionado!</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex justify-center text-black">
            <div
              className="my-3 rounded-md bg-blue-950 p-2 text-white hover:cursor-pointer"
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
            <p className="p-2 text-center text-black">
              Exames ainda não identificados
            </p>
          ) : (
            <>
              <div className="mb-2 flex max-h-[800px] justify-center overflow-y-auto text-black">
                <ExamsTable
                  resultExams={resultExams}
                  apiExams={apiExams}
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
