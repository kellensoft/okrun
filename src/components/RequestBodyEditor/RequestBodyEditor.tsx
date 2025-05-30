import React from "react";

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
  // Find all variables referenced in the body
  const usedVars = extractVars(value);
  // Which are missing from defined variables
  const missingVars = Array.from(new Set(usedVars.filter(v => !variables.includes(v))));
  // Which are defined but unused
  const unusedVars = variables.filter(v => !usedVars.includes(v));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>
        Request Body
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={8}
          style={{ fontFamily: "monospace", minWidth: 320, minHeight: 100 }}
          aria-label="Request Body"
        />
      </label>
      <div style={{ marginTop: 6 }}>
        {missingVars.length > 0 && (
          <div style={{ color: "red" }}>
            Missing variables:&nbsp;
            {missingVars.map(v => <code key={v} style={{ marginRight: 4 }}>{v}</code>)}
          </div>
        )}
        {unusedVars.length > 0 && (
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
