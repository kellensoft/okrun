import type { StoryFn } from '@storybook/react-vite';
import { useState } from "react";
import { HeaderTable } from "./HeaderTable";
import type { Header } from "./HeaderTable.types";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Components/HeaderTable",
  component: HeaderTable,
};

const Template: StoryFn = (args) => {
  const [headers, setHeaders] = useState<Header[]>(args.headers);
  return <HeaderTable headers={headers} onChange={setHeaders} />;
};

export const Default = Template.bind({});
Default.args = {
  headers: [
    { id: uuidv4(), name: "X-Foo", value: "Bar" },
    { id: uuidv4(), name: "", value: "" },
  ],
};
