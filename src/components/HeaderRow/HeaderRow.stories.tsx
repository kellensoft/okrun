import type { StoryFn } from '@storybook/react-vite';
import { useState } from "react";
import { HeaderRow } from "./HeaderRow";
import type { HeaderRowProps } from "./HeaderRow.types";
import { v4 as uuidv4 } from "uuid";

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

export default {
  title: "Components/HeaderRow",
  component: HeaderRow,
};

const Template: StoryFn<HeaderRowProps> = (args) => {
  const [name, setName] = useState(args.name ?? "");
  const [value, setValue] = useState(args.value ?? "");

  const handleChange = (change: { name: string; value: string; id: string }) => {
    setName(change.name);
    setValue(change.value);
  };

  return (
    <HeaderRow
      {...args}
      name={name}
      value={value}
      onChange={handleChange}
      onRemove={() => alert("Remove clicked!")}
      idx={0}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: id1,
  name: "",
  value: "",
  disableRemove: false,
};

export const WithNameValue = Template.bind({});
WithNameValue.args = {
  id: id2,
  name: "X-Foo",
  value: "Bar",
};

export const NameMissing = Template.bind({});
NameMissing.args = {
  id: id3,
  name: "",
  value: "Value",
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  id: id4,
  name: "Duplicate",
  value: "123",
  error: "Duplicate name",
};

export const RemoveDisabled = Template.bind({});
RemoveDisabled.args = {
  id: id5,
  name: "X-Test",
  value: "Val",
  disableRemove: true,
};