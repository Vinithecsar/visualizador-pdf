import ExamsContext from "@/context/ExamsContext";
import { useContext } from "react";

const useExams = () => useContext(ExamsContext);

export default useExams;
