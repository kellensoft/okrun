import React from "react";
import type { OutputRuleRowProps } from "./OutputRuleRow.types";

const RULE_TYPES = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "regex", label: "Regex" },
  { value: "css", label: "CSS Selector" },
];

export const OutputRuleRow: React.FC<OutputRuleRowProps> = ({
  id,
  type,
  pattern,
  name,
  error,
  onChange,
  onRemove,
  disableRemove = false,
  idx = 0,
}) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <input
        id={`output-rule-name-${id}`}
        type="text"
        aria-label={`Output Name ${idx + 1}`}
        value={name}
        onChange={e =>
          onChange({id, type, pattern, name: e.target.value })
        }
        placeholder="Output Name"
        style={{ borderColor: !name ? "red" : undefined }}
      />
      <select
        id={`output-rule-type-${id}`}
        aria-label={`Extraction Type ${idx + 1}`}
        value={type}
        onChange={e =>
          onChange({id, type: e.target.value, pattern, name })
        }
      >
        {RULE_TYPES.map(rt => (
          <option value={rt.value} key={rt.value}>
            {rt.label}
          </option>
        ))}
      </select>
      <input
        id={`output-rule-pattern-${id}`}
        type="text"
        aria-label={`Extraction Pattern ${idx + 1}`}
        value={pattern}
        onChange={e =>
          onChange({id, type, pattern: e.target.value, name })
        }
        placeholder="Pattern"
        style={{ minWidth: 140, borderColor: name && !pattern ? "red" : undefined }}
      />
      <button
        id={`remove-output-rule-${id}`}
        type="button"
        aria-label={`Remove output rule ${idx + 1}`}
        onClick={onRemove}
        disabled={disableRemove}
      >
        Remove
      </button>
      {(!name || (name && !pattern) || error) && (
        <span style={{ color: "red", minWidth: 80 }}>
          {error || (!name ? "Name required" : "Pattern required")}
        </span>
      )}
    </div>
  );
};

export default OutputRuleRow;
