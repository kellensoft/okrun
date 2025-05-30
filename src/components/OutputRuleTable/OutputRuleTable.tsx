import React from "react";
import { OutputRuleRow } from "../OutputRuleRow";
import type { OutputRule, OutputRuleTableProps } from "./OutputRuleTable.types";
import { v4 as uuidv4 } from "uuid";

export const OutputRuleTable: React.FC<OutputRuleTableProps> = ({
  rules,
  onChange,
  errors = [],
}) => {
  const handleRowChange = (id: string, rule: OutputRule) => {
    const newRules = rules.slice();
    const index = newRules.findIndex(r => r.id === id);
    if (index === -1) {
      console.warn("Output rule not found for update:", id);
      return;
    }
    newRules[index] = rule;
    onChange(newRules);
  };

  const handleRowRemove = (id: string) => {
    const newRules = rules.filter(rule => rule.id !== id);
    onChange(newRules);
  };

  const handleAdd = () => {
    onChange([...rules, { id: uuidv4(), name: "", pattern: "", type: "jsonpath" }]);
  };

  const nameCounts = rules.reduce((acc, r) => {
    const name = r.name.trim().toLowerCase();
    if (!name) return acc;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const isDuplicate = (name: string) =>
    !!name && nameCounts[name.trim().toLowerCase()] > 1;

  return (
    <div>
      {rules.length === 0 ? (
          <button
          type="button"
          onClick={handleAdd}
          aria-label="Add output extraction rule"
          style={{ marginTop: "0.5rem" }}
        >
          Add Output
        </button>
      ) : (
        <>
          {rules.map((rule, idx) => (
            <OutputRuleRow
              key={rule.id}
              {...rule}
              error={isDuplicate(rule.name) ? "Duplicate name" : errors[idx]}
              onChange={(r) => handleRowChange(rule.id, r)}
              onRemove={() => handleRowRemove(rule.id)}
              idx={idx}
            />
          ))}
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add output extraction rule"
            style={{ marginTop: "0.5rem" }}
          >
            Add Output
          </button>
        </>
      )}
    </div>
  );
};

export default OutputRuleTable;
