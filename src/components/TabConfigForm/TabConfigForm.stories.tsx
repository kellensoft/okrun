import { useState } from "react";
import { TabConfigForm } from "./TabConfigForm";
import type { TabConfig } from "./TabConfigForm.types.ts";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/TabConfigForm",
  component: TabConfigForm,
};

export const Default = () => {
  const [state, setState] = useState<TabConfig>({
    url: "",
    method: "GET",
    delay: "",
    variables: [{ id: uuidv4(), name: "", value: "", pattern: "" }],
    body: "",
    outputRules: [{ id: uuidv4(), type: "jsonpath", pattern: "", name: "" }],
    headers: [{ id: uuidv4(), name: "", value: "" }]
  });
  return (
    <TabConfigForm value={state} onChange={setState} />
  );
};
