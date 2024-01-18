import { NextRequest, NextResponse } from "next/server";

function getExams() {
  const exams = {
    "": [],
    HEMOGRAMA: ["HEMOGRAMA"],
    COAGULOGRAMA: ["COAGULOGRAMA"],
    ALBUMINA: [],
    "ABO-RH": [],
    "ANTI-HBS": ["ANTICORPOS ANTI-HBS (HEPATITE B)"],
    "RUBÉOLA-IGG": [],
    "TOXOPLAMOSE-IGG": [],
    "CITOMEGALOVIRUS IGG": [],
    TSH: [
      "ANTICORPO ANTI-RECEPTOR DE TSH (TRAB)",
      "MACRO TSH",
      "TIREOTROPINA (TSH) NEONATAL CONFIRMATÓRIO",
      "TSH - HORMÔNIO TIREOESTIMULANTE ",
      "TSH - HORMÔNIO TIREOESTIMULANTE ULTRA SENSÍVEL ",
    ],
    "": [],
    PCR: [
      " HEPATITE C (QUALITATIVO) POR PCR, PESQUISA",
      "ASPERGILLUS, PESQUISA QUALITATIVA POR PCR",
      "BKV - PCR QUANTITATIVO",
      "BORDETELLA PERTUSSIS E B. PARAPERTUSSIS - PCR ",
      "BORRELIA BURGDORFERI (DOENÇA DE LYME) - PCR",
      "BRUCELLA, DETECÇÃO MOLECULAR POR PCR",
      "DETECÇÃO DE HERPES VÍRUS TIPO 6 POR PCR",
      "DETECÇÃO DE MICOPLASMA POR PCR",
      "DETECÇÃO DE VARICELLA ZOSTER POR PCR ",
      "DETECÇÃO DOS VÍRUS HTLV I E II POR PCR",
      "EBV - PCR QUANTITATIVO",
      "GENOTIPAGEM PARA HTLV 1 E 2 POR PCR (QUALITATIVO) ",
      "HEPATITE E - PCR QUALITATIVO",
      "HIV - CARGA VIRAL QUANTITATIVO – PCR",
      "HLA-B-27, PESQUISA - PCR",
      "HLA B27 - DETECÇÃO POR PCR",
      "METILAÇÃO ANGELMAN/PRADER WILLI POR PCR",
      "MULTIPLEX BACTERIANO PCR IST/URETRITES",
      "MYCOBACTERIUM TUBERCULOSIS - GENEXPERT PCR",
      "PCR MULTIPLEX PARA FUNGOS CAUSADORES DE MICOSES ",
      "PCR MULTIPLEX PARA TRICHOMONAS, NEISSERIA E CHLAMYDIA",
      "PCR MULTIPLEX PARA ZIKA, DENGUE E CHIKUNGUNYA",
      "PCR PARA A DETECÇÃO DE H. PYLORI E RESISTÊNCIA A CLARITROMICINA",
      "PCR PARA CHLAMYDIA TRACHOMATIS ",
      "PCR PARA CHLAMYDIA TRACHOMATIS/NEISSERIA GONORRHOEAE",
      "PCR PARA CITOMEGALOVÍRUS - QUALITATIVO",
      "PCR PARA CITOMEGALOVÍRUS - QUANTITATIVO",
      "PCR PARA DETECÇÃO DO VÍRUS MONKEYPOX",
      "PCR PARA ENTEROVÍRUS - LÍQUOR",
      "PCR PARA ENTEROVÍRUS - SANGUE",
      "PCR PARA FEBRE AMARELA",
      "PCR PARA HEPATITE B - QUALITATIVO",
      "PCR PARA HEPATITE B - QUANTITATIVO ",
      "PCR PARA HEPATITE C (QUANTITATIVO)",
      "PCR PARA HEPATITE E  (QUALITATIVO)",
      "PCR PARA HERPES SIMPLES VÍRUS 1 E 2 (HSV I E II)",
      "PCR PARA HIV - QUALITATIVO",
      "PCR PARA LEISHMANIA",
      "PCR PARA LEPTOSPIRA SPP (LEPTOSPIROSE)",
      "PCR PARA MYCOBACTERIUM TUBERCULOSIS ",
      "PCR PARA MYCOPLASMA GENITALIUM",
      "PCR PARA MYCOPLASMA HOMINIS",
      "PCR PARA NEISSERIA GONORRHOEAE",
      "PCR PARA PARVOVÍRUS ",
      "PCR PARA PNEUMOCYSTIS JIROVECII",
      "PCR PARA TREPONEMA PALLIDUM (SÍFILIS)",
      "PCR PARA \nUREAPLASMA UREALYTICUM",
      "PCR PARA VARICELA ZOSTER",
      "PCR PARA VÍRUS EPSTEIN BARR - QUANTITATIVO",
      "PCR PARA VÍRUS MAYARO",
      "PCR PARA VÍRUS OROPOUCHE",
      "PCR PARA VÍRUS SINCICIAL RESPIRATÓRIO",
      "PCR PARA ZIKA VÍRUS ",
      "PESQUISA DE MYCOBACTERIUM LEPRAE POR PCR",
      "PESQUISA DE PARAMIXOVÍRUS (CAXUMBA) POR PCR ",
      "PESQUISA DE STREPTOCOCCUS DO GRUPO B (GBS) POR PCR EM TEMPO REAL",
      "PESQUISA DE X FRÁGIL POR PCR",
      "PML-RARA - DETECÇÃO E QUANTIFICAÇÃO POR PCR",
      "POC - ANÁLISE DE RESTOS FETAIS POR PCR",
      "RT-PCR EXPRESS - COVID-19 (COVID-19) ",
      "RT-PCR PARA SARS-CoV-2 (COVID-19)",
      "RT-PCR PARA SARS-CoV-2 (COVID-19) - SALIVA",
      "TROPHERYMA WHIPPLEI DNA (DOENÇA DE WHIPPLE) - PCR ",
    ],
    "AST/TGO": ["ASPARTATO AMINOTRANSFERASE (AST/TGO)"],
    CÁLCIO: [
      "ANTICORPOS ANTI CANAIS DE CÁLCIO",
      "CÁLCIO - URINA 24 HORAS",
      "CÁLCIO INTRAERITROCITÁRIO",
      "CÁLCIO IÔNICO",
      "CÁLCIO SÉRICO",
      "CÁLCIO URINÁRIO",
      "RELAÇÃO CÁLCIO/CREATININA - URINA",
    ],
    TESTOSTERONA: [
      "DIHIDROTESTOSTERONA (DHT)",
      "TESTOSTERONA BIODISPONÍVEL",
      "TESTOSTERONA LIVRE",
      "TESTOSTERONA LIVRE CALCULADA",
      "TESTOSTERONA LIVRE SALIVAR",
      "TESTOSTERONA POR MASSAS",
      "TESTOSTERONA TOTAL",
    ],
    "LH LDH DESIDROGENASE": [],
    LDL: [" ANTICORPO ANTI-LDL OXIDADA ", "COLESTEROL HDL, LDL, VLDL OU TOTAL"],
    "USG PÉLVICA": [],
    EAS: [
      "ADAMTS-13 (ATIVIDADE DA PROTEASE DE RUPTURA DE FATOR DE VON WILLEBRAND)",
      "ANTIDESOXIRIBONUCLEASE B",
      "ANTIDESOXIRIBONUCLEASE B, NEUTRALIZAÇÃO QUANTITATIVA",
      "IGE ESPECÍFICO (G10) - GRAMÍNEAS- ZABURRO DE ALEPO",
      "IGE ESPECÍFICO (G13) - GRAMÍNEAS - GRAMA VELUDO",
      "IGE ESPECÍFICO (G2) - GRAMÍNEAS - GRAMA",
      "IGE PAINEL (GX1) - GRAMÍNEAS - PANASCO, SARGASSO, AZEVÉM, RABO DE GATO E CAPIM DE JUNO ",
      "IGE PAINEL (GX2) - GRAMÍNEAS - BERMUDAS, CENTEIO \nPERENE, TIMÓTEO, JUNTO E JOHNSON ",
    ],
    ESTRADIOL: ["ESTRADIOL"],
    "ECOCARDIOGRAMA FETAL": [],
  };
  return exams;
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json([{ success: false }]);
  }

  const examsObject = {
    [file.name]: [],
    ...getExams(),
  };

  return NextResponse.json({ listaExames: examsObject });
}
