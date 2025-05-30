import { useState } from "react";
import { RequestBodyEditor } from "./RequestBodyEditor";

export default {
  title: "Components/RequestBodyEditor",
  component: RequestBodyEditor,
};

export const Default = () => {
  const [value, setValue] = useState<string>('{"id": "{{foo}}"}');
  const variables = ["foo", "bar"];
  return (
    <RequestBodyEditor value={value} variables={variables} onChange={setValue} />
  );
};
