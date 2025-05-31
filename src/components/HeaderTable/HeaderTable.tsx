import React from "react";
import { HeaderRow } from "../HeaderRow";
import type { HeaderTableProps, Header } from "./HeaderTable.types";
import { v4 as uuidv4 } from "uuid";

export const HeaderTable: React.FC<HeaderTableProps> = ({
  headers,
  onChange,
  errors = [],
}) => {
  const handleRowChange = (id: string, header: Header) => {
    const newHeaders = headers.slice();
    const index = newHeaders.findIndex((h) => h.id === id);
    if (index === -1) {
      console.warn("Header not found for update:", id);
      return;
    }
    newHeaders[index] = header;
    onChange(newHeaders);
  };

  const handleRowRemove = (id: string) => {
    const newHeaders = headers.filter((h) => h.id !== id)
    onChange(newHeaders);
  };

  const handleAdd = () => {
    onChange([...headers, {id: uuidv4(), name: "", value: "" }]);
  };

  const nameCounts = headers.reduce((acc, h) => {
    const name = h.name.trim().toLowerCase();
    if (!name) return acc;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const isDuplicate = (name: string) =>
    !!name && nameCounts[name.trim().toLowerCase()] > 1;

  return (
    <div>
      {headers.length === 0 ? (
        <button
          type="button"
          onClick={handleAdd}
          style={{ marginTop: "0.5rem" }}
          aria-label="Add header"
        >
          Add Header
        </button>
      ) : (
        <>
          {headers.map((header, idx) => (
            <HeaderRow
              key={header.id}
              {...header}
              error={isDuplicate(header.name) ? "Duplicate name" : errors[idx]}
              onChange={(h) => handleRowChange(header.id, h)}
              onRemove={() => handleRowRemove(header.id)}
              idx={idx}
            />
          ))}
          <button
            type="button"
            onClick={handleAdd}
            style={{ marginTop: "0.5rem" }}
            aria-label="Add header"
          >
            Add Header
          </button>
        </>
      )}
    </div>
  );
};
