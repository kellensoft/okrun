import React from "react";
import { EndpointMethodInput } from "../EndpointMethodInput";
import { DelayInput } from "../DelayInput";
import { VariableTable } from "../VariableTable";
import { RequestBodyEditor } from "../RequestBodyEditor";
import { OutputRuleTable } from "../OutputRuleTable";
import { HeaderTable } from "../HeaderTable";
import type { TabConfig } from "./TabConfigForm.types.ts"; 

export interface TabConfigFormProps {
  value: TabConfig;
  onChange: (value: TabConfig) => void;
}

export const TabConfigForm: React.FC<TabConfigFormProps> = ({ value, onChange }) => {
  function update<K extends keyof typeof value>(key: K, v: typeof value[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <EndpointMethodInput
        url={value.url}
        method={value.method}
        onChange={v => onChange({ ...value, ...v })}
      />

      <HeaderTable
        headers={value.headers}
        onChange={headers => update("headers", headers)}
      />

      <DelayInput
        value={value.delay}
        onChange={v => update("delay", v)}
      />

      <VariableTable
        variables={value.variables}
        onChange={vars => update("variables", vars)}
      />

      <RequestBodyEditor
        value={value.body}
        variables={value.variables.map(v => v.name)}
        onChange={v => update("body", v)}
      />

      <OutputRuleTable
        rules={value.outputRules}
        onChange={rules => update("outputRules", rules)}
      />
    </form>
  );
};

export default TabConfigForm;
