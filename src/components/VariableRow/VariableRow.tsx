import React from "react";
import type { VariableRowProps } from "./VariableRow.types";

export const VariableRow: React.FC<VariableRowProps> = ({
  id,
  name,
  value,
  pattern,
  error,
  onChange,
  onRemove,
  disableRemove = false,
  idx = 0,
}) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <input
        id={`variable-name-${id}`}
        type="text"
        aria-label={`Input Name ${idx + 1}`}
        value={name}
        onChange={e => onChange({id, name: e.target.value, value, pattern })}
        placeholder="Name"
        style={{ borderColor: !name ? "red" : undefined }}
      />
      <input
        id={`variable-value-${id}`}
        type="text"
        aria-label={`Input Value ${idx + 1}`}
        value={value}
        onChange={e => onChange({id, name, value: e.target.value, pattern })}
        placeholder="Value"
      />
      <input
        id={`variable-pattern-${id}`}
        type="text"
        aria-label={`Input Pattern ${idx + 1}`}
        value={pattern ?? ""}
        onChange={e =>
          onChange({id, name, value, pattern: e.target.value || undefined })
        }
        placeholder="Pattern (optional)"
      />
      <button
        id={`remove-variable-${id}`}
        type="button"
        aria-label={`Remove input variable ${idx + 1}`}
        onClick={onRemove}
        disabled={disableRemove}
      >
        Remove
      </button>
      {(!name || error) && (
        <span style={{ color: "red", minWidth: 80 }}>
          {error || "Name required"}
        </span>
      )}
    </div>
  );
};
