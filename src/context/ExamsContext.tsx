"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ExamsContextProps {
  resultExams?: string[];
  setResultExams?: Dispatch<SetStateAction<string[]>>;
}

const ExamsContext = createContext<ExamsContextProps>({});

export function ExamsProvider(props: any) {
  const [resultExams, setResultExams] = useState<string[]>([]);

  return (
    <ExamsContext.Provider value={{ resultExams, setResultExams }}>
      {props.children}
    </ExamsContext.Provider>
  );
}

export default ExamsContext;
