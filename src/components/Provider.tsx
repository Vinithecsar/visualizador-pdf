import { ExamsProvider } from "@/context/ExamsContext";

export function Provider({ children }: { children: React.ReactNode }) {
  return <ExamsProvider>{children}</ExamsProvider>;
}
