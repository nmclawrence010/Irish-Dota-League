import React from "react";
import { Division } from "../types/tournament";

interface DivisionTableProps {
  division: Division;
}

export const DivisionTable: React.FC<DivisionTableProps> = () => {
  return <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors"></div>;
};
