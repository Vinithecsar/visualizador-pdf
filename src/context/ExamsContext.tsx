"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ExamsContextProps {
  resultExams?: { idNome: string; nome: string }[];
  setResultExams?: Dispatch<SetStateAction<{ idNome: string; nome: string }[]>>;
}

const ExamsContext = createContext<ExamsContextProps>({});

export function ExamsProvider(props: any) {
  const [resultExams, setResultExams] = useState<
    { idNome: string; nome: string }[]
  >([]);

  return (
    <ExamsContext.Provider value={{ resultExams, setResultExams }}>
      {props.children}
    </ExamsContext.Provider>
  );
}

export default ExamsContext;
