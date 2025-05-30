import React from "react";

export interface DelayInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export const DelayInput: React.FC<DelayInputProps> = ({ value, onChange }) => {
  // Only allow empty or integer >= 0
  const isValid = value === "" || (typeof value === "number" && Number.isInteger(value) && value >= 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "") {
      onChange("");
    } else if (/^\d+$/.test(val)) {
      onChange(Number(val));
    } else {
      onChange(value); // Ignore invalid
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: 120 }}>
      <label>
        Delay (ms)
        <input
          type="number"
          min={0}
          aria-label="Delay (ms)"
          value={value}
          placeholder="0"
          onChange={handleChange}
          style={{ borderColor: isValid ? undefined : "red" }}
        />
      </label>
      {!isValid && (
        <span style={{ color: "red" }}>Must be a non-negative integer</span>
      )}
    </div>
  );
};

export default DelayInput;
