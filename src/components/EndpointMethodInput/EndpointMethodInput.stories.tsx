import React, { useState } from "react";
import { EndpointMethodInput } from "./EndpointMethodInput";

export default {
  title: "Components/EndpointMethodInput",
  component: EndpointMethodInput,
};

export const Default = () => {
  const [state, setState] = useState({ url: "", method: "GET" });
  return (
    <EndpointMethodInput {...state} onChange={setState} />
  );
};
