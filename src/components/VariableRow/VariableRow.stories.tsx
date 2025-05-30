import { useState } from "react";
import { VariableRow } from "./VariableRow";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/VariableRow",
  component: VariableRow,
};

export const Empty = () => {
  const [state, setState] = useState({ name: "", value: "", pattern: "" });
  return (
    <VariableRow
        id={uuidv4()}
      key={0}
      {...state}
      onChange={variable => setState({ ...variable, pattern: variable.pattern ?? "" })}
      onRemove={() => alert("Remove!")}
      idx={0}
    />
  );
};

export const DuplicateName = () => {
  const [state, setState] = useState({ name: "foo", value: "bar", pattern: "" });
  return (
    <>
      <VariableRow
        id={uuidv4()}
        key={0}
        {...state}
        error="Duplicate name"
        onChange={variable => setState({ ...variable, pattern: variable.pattern ?? "" })}
        onRemove={() => alert("Remove!")}
        idx={0}
      />
      <VariableRow
        id={uuidv4()}
        key={1}
        {...state}
        error="Duplicate name"
        onChange={variable => setState({ ...variable, pattern: variable.pattern ?? "" })}
        onRemove={() => alert("Remove!")}
        idx={1}  
      />
    </>
  );
};

export const DisabledRemove = () => {
  const [state, setState] = useState({ name: "foo", value: "bar", pattern: "" });
  return (
    <VariableRow
      id={uuidv4()}
      key={0}
      {...state}
      onChange={variable => setState({ ...variable, pattern: variable.pattern ?? "" })}
      onRemove={() => alert("Remove!")}
      disableRemove
      idx={0}
    />
  );
};
