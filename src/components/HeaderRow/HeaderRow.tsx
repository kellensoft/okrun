import React from "react";
import type { HeaderRowProps } from "./HeaderRow.types";

export const HeaderRow: React.FC<HeaderRowProps> = ({
  id,
  name,
  value,
  error,
  onChange,
  onRemove,
  disableRemove = false,
  idx = 0,
}) => (
  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
    <input
      aria-label={`Header Name ${idx + 1}`}
      placeholder="Header Name"
      value={name}
      style={{ borderColor: !name ? "red" : undefined }}
      onChange={e => onChange({ id, name: e.target.value, value })}
    />
    <input
      aria-label={`Header Value ${idx + 1}`}
      placeholder="Header Value"
      value={value}
      onChange={e => onChange({ id, name, value: e.target.value })}
    />
    <button
      aria-label={`Remove header ${idx + 1}`}
      onClick={onRemove}
      disabled={disableRemove}
    >
      Remove
    </button>
    {(!name || error) && (
      <span style={{ color: "red" }}>
        {error || "Name required"}
      </span>
    )}
  </div>
);
