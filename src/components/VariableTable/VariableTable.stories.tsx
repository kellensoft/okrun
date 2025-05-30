import { useState } from "react";
import { VariableTable } from "./VariableTable";
import type { Variable } from "./VariableTable.types";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/VariableTable",
  component: VariableTable,
};

export const Default = () => {
  const [variables, setVariables] = useState<Variable[]>([
    { id: uuidv4(), name: "", value: "", pattern: "" },
  ]);
  return (
    <VariableTable variables={variables} onChange={setVariables} />
  );
};
