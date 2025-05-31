import React from "react";
import { v4 as uuidv4 } from "uuid";

export interface RequestBodyEditorProps {
  value: string;
  variables: string[];
  onChange: (value: string) => void;
}

function extractVars(str: string): string[] {
  const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
  const vars: string[] = [];
  let match;
  while ((match = regex.exec(str))) {
    vars.push(match[1]);
  }
  return vars;
}

export const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  value,
  variables,
  onChange,
}) => {
  const usedVars = extractVars(value);
  const missingVars = Array.from(new Set(usedVars.filter(v => !variables.includes(v))));
  const unusedVars = Array.from(new Set(variables.filter(v => !usedVars.includes(v))));

  const id = uuidv4();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={`request-body-${id}`} style={{ marginBottom: 4 }}>
        Request Body
      </label>
        <textarea
          id={`request-body-${id}`}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={8}
          style={{ fontFamily: "monospace", minWidth: 320, minHeight: 100 }}
          aria-label="Request Body"
        />
      <div style={{ marginTop: 6 }}>
        {missingVars.filter(v => v !== "").length > 0 && (
          <div style={{ color: "red" }}>
            Missing variables:&nbsp;
            {missingVars.map(v => <code key={v} style={{ marginRight: 4 }}>{v}</code>)}
          </div>
        )}
        {unusedVars.filter(v => v !== "").length > 0 && (
          <div style={{ color: "#e69b00" }}>
            Unused variables:&nbsp;
            {unusedVars.map(v => <code key={v} style={{ marginRight: 4 }}>{v}</code>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestBodyEditor;
