import React from "react";
import { VariableRow } from "../VariableRow";
import type { VariableTableProps, Variable } from "./VariableTable.types";
import { v4 as uuidv4 } from "uuid";


export const VariableTable: React.FC<VariableTableProps> = ({
  variables,
  onChange,
  errors = [],
}) => {
  const handleRowChange = (id: string, variable: Variable) => {
    const newVariables = variables.slice();
    const index = newVariables.findIndex((v) => v.id === id);
    if (index === -1) {
      console.warn("Variable not found for update:", id);
      return;
    }
    newVariables[index] = variable;
    onChange(newVariables);
  };

  const handleRowRemove = (id: string) => {
    const newVariables = variables.filter((v) => v.id !== id);
    onChange(newVariables);
  };

  const handleAdd = () => {
    onChange([...variables, { id: uuidv4(), name: "", value: "", pattern: "" }]);
  };

  const nameCounts = variables.reduce((acc, v) => {
    const name = v.name.trim().toLowerCase();
    if (!name) return acc;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const isDuplicate = (name: string) =>
    !!name && nameCounts[name.trim().toLowerCase()] > 1;

  return (
    <div>
      {variables.length === 0 ? (
        <button
          onClick={handleAdd}
          aria-label="Add input variable"
          style={{ marginTop: "0.5rem" }}
        >
          Add Input
        </button>
      ) : (
        <>
          {variables.map((variable, idx) => (
            <VariableRow
              key={variable.id}
              {...variable}
              error={isDuplicate(variable.name) ? "Duplicate name" : errors[idx]}
              onChange={(v) => handleRowChange(variable.id, v)}
              onRemove={() => handleRowRemove(variable.id)}
              idx={idx}
            />
          ))}
          <button
            onClick={handleAdd}
            aria-label="Add input variable"
            style={{ marginTop: "0.5rem" }}
          >
            Add Input
          </button>
        </>
      )}
    </div>
  );
};

export default VariableTable;
