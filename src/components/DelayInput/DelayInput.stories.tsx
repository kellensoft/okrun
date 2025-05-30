import { useState } from "react";
import { DelayInput } from "./DelayInput";

export default {
  title: "Components/DelayInput",
  component: DelayInput,
};

export const Default = () => {
  const [value, setValue] = useState<number | "">(1000);
  return <DelayInput value={value} onChange={setValue} />;
};
