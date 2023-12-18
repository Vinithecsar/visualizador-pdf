"use client";

import Button from "@/components/Button";
import { useState } from "react";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorMessage";
import ExamsTable from "@/components/ExamsTable";
import { pdfjs } from "react-pdf";
import html2canvas from "html2canvas";

export default function Home() {
  const [selectedFile, SetSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, SetSelectedFileUrl] = useState<string>("");
  const [resultExams, setResultExams] = useState<string[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const converPdfToJpg = async (pdfUrl: string) => {
    const pdfDocument = await pdfjs.getDocument(pdfUrl).promise;
    const pdfPage = await pdfDocument.getPage(1);
    const viewport = pdfPage.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await pdfPage.render({ canvasContext: canvas.getContext("2d")!, viewport })
      .promise;

    document.body.appendChild(canvas);

    const imageDataUrl = await html2canvas(canvas).then((canvas) =>
      canvas.toDataURL("image/jpg"),
    );

    document.body.removeChild(canvas);

    const ImgBase64 = imageDataUrl.split(",")[1];
    const blob = new Blob([ImgBase64], { type: "image/jpg" });
    const arquivo = new File([blob], "prescricao.jpg", {
      type: blob.type,
    });

    return arquivo;
  };

  const handleFileChange = async (e: any) => {
    const arquivo: File = e.target.files[0];
    const novoArquivo = new File([arquivo], "prescricao.jpg", {
      type: arquivo.type,
      lastModified: arquivo.lastModified,
    });
    const objectURL = URL.createObjectURL(novoArquivo);

    if (arquivo.type !== "application/pdf") {
      setError("Apenas arquivos pdf são aceitos!");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    const arquivoJpg = await converPdfToJpg(objectURL);

    setResultExams([]);
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

      const exams = await res.json();
      setResultExams(exams.listaExames);
    } catch (e: any) {
      console.error(e);
    } finally {
      SetIsLoading(false);
    }
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
        <div className="mr-2 w-2/3 rounded-md bg-[#D9D9D9]">
          {selectedFileUrl ? (
            // <Image
            //   src={selectedFileUrl}
            //   alt="Arquivos com exames"
            //   width={1920}
            //   height={852}
            // />
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
        <div className="w-1/3 rounded-md bg-[#2E8752]">
          <h1 className="p-2 text-center text-lg font-semibold">
            {resultExams.length === 0 ? null : resultExams.length} Exames
            resultantes:
          </h1>

          {resultExams.length === 0 ? (
            <p className="p-2 text-center">Exames ainda não identificados</p>
          ) : (
            <div className="mb-2 flex max-h-[800px] justify-center overflow-y-auto">
              <ExamsTable resultExams={resultExams} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
