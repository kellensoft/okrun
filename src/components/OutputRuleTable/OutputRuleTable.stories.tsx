import { useState } from "react";
import { OutputRuleTable } from "./OutputRuleTable";
import type { OutputRule } from "./OutputRuleTable.types";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/OutputRuleTable",
  component: OutputRuleTable,
};

export const Default = () => {
  const [rules, setRules] = useState<OutputRule[]>([
    { id: uuidv4(), type: "jsonpath", pattern: "$.foo", name: "foo" },
  ]);
  return <OutputRuleTable rules={rules} onChange={setRules} />;
};
