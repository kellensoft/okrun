import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface DelayInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export const DelayInput: React.FC<DelayInputProps> = ({ value, onChange }) => {
  const isValid = value === "" || (typeof value === "number" && Number.isInteger(value) && value >= 0);

  const id = uuidv4();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "") {
      onChange("");
    } else if (/^\d+$/.test(val)) {
      onChange(Number(val));
    } else {
      onChange(value);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 120 }}>
      <label htmlFor={`delay-input-${id}`} style={{ marginBottom: 4 }}>
        Delay (ms)
      </label>
      <input
        id={`delay-input-${id}`}
        type="number"
        min={0}
        aria-label="Delay (ms)"
        value={value}
        placeholder="0"
        onChange={handleChange}
        style={{ borderColor: isValid ? undefined : "red" }}
      />
      {!isValid && (
        <span style={{ color: "red" }}>Must be a non-negative integer</span>
      )}
    </div>
  );
};

export default DelayInput;
