import html2canvas from "html2canvas";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function ConvertPdfToJpg(pdfUrl: string) {
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
}
