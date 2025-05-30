import { useState } from "react";
import { OutputRuleRow } from "./OutputRuleRow";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/OutputRuleRow",
  component: OutputRuleRow,
};

export const Default = () => {
  const [state, setState] = useState({
    type: "jsonpath",
    pattern: "",
    name: "",
  });
  return (
    <OutputRuleRow
      id={uuidv4()}
      {...state}
      key={0}
      onChange={setState}
      onRemove={() => alert("Remove!")}
      idx={0}
    />
  );
};
