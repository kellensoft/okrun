import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TabConfigForm } from "./TabConfigForm";
import type { TabConfig } from "./TabConfigForm.types.ts";
import { v4 as uuidv4 } from "uuid";

const defaultConfig: TabConfig = {
  url: "",
  method: "GET",
  delay: "",
  variables: [{ id: uuidv4(), name: "", value: "", pattern: "" }],
  body: "",
  outputRules: [{ id: uuidv4(), type: "jsonpath", pattern: "", name: "" }],
  headers: [{ id: uuidv4(), name: "", value: "" }]
};

function Wrapper({ value = defaultConfig }: { value?: TabConfig }) {
  const [state, setState] = React.useState(value);
  return <TabConfigForm value={state} onChange={setState} />;
}

describe("TabConfigForm", () => {
  it("renders all core input sections", () => {
    render(<TabConfigForm value={defaultConfig} onChange={() => {}} />);
    expect(screen.getByLabelText(/endpoint url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/http method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/request body/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add input variable/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add output extraction rule/i })).toBeInTheDocument();
  });

  it("updates URL and method", async () => {
    render(<Wrapper />);
    const urlInput = screen.getByLabelText(/endpoint url/i);
    await userEvent.type(urlInput, "http://foo");
    await waitFor(() => expect(urlInput).toHaveValue("http://foo"));

    const methodSelect = screen.getByLabelText(/http method/i);
    await userEvent.selectOptions(methodSelect, "POST");
    expect(methodSelect).toHaveValue("POST");
  });

  it("updates delay", async () => {
    render(<Wrapper />);
    const delayInput = screen.getByLabelText(/delay/i);
    await userEvent.clear(delayInput);
    await userEvent.type(delayInput, "500");
    expect(delayInput).toHaveValue(500);
  });

  it("updates a variable name", async () => {
    render(<Wrapper value={{ ...defaultConfig, variables: [{ id: uuidv4(), name: "", value: "", pattern: "" }] }} />);
    const varNameInput = screen.getByLabelText(/Input Name/i);
    await userEvent.type(varNameInput, "foo");
    expect(varNameInput).toHaveValue("foo");
  });

  it("updates request body", async () => {
    render(<Wrapper />);
    const textarea = screen.getByLabelText(/request body/i);
    await userEvent.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("updates output rule name", async () => {
    render(<Wrapper />);
    const outputInput = screen.getByLabelText(/Output Name/i);
    await userEvent.clear(outputInput);
    await userEvent.type(outputInput, "result");
    expect(outputInput).toHaveValue("result");
  });

  it("calls onChange when a header is updated", async () => {
    render(<Wrapper />);
    const headerInputs = screen.getAllByPlaceholderText(/header name/i);
    await userEvent.clear(headerInputs[0]);
    await userEvent.type(headerInputs[0], "X-New");
    await waitFor(() => {
        expect(headerInputs[0]).toHaveValue("X-New");
    });
  });
});
