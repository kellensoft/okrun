import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { OutputRuleRow } from "./OutputRuleRow";
import { v4 as uuidv4 } from "uuid";

describe("OutputRuleRow", () => {
  it("renders all input fields", () => {
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="jsonpath"
        pattern=""
        name=""
        onChange={() => {}}
        onRemove={() => {}}
        idx = {0}
      />
    );
    expect(screen.getByPlaceholderText("Pattern")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Output Name")).toBeInTheDocument();
    expect(screen.getByLabelText(/Extraction Type/)).toBeInTheDocument();
  });

  it("shows error on empty name", () => {
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="regex"
        pattern=""
        name=""
        onChange={() => {}}
        onRemove={() => {}}
        idx = {0}
      />
    );
    expect(screen.getByText("Name required")).toBeInTheDocument();
  });

  it("shows error on duplicate name", () => {
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="regex"
        pattern=""
        name="foo"
        error="Duplicate name"
        onChange={() => {}}
        onRemove={() => {}}
        idx = {0}
      />
    );
    expect(screen.getByText("Duplicate name")).toBeInTheDocument();
  });

  it("calls onChange when fields change", async () => {
    const onChange = vi.fn();
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="jsonpath"
        pattern=""
        name=""
        onChange={onChange}
        onRemove={() => {}}
        idx = {0}
      />
    );
    await userEvent.selectOptions(screen.getByLabelText(/Extraction Type/), "regex");
    await userEvent.type(screen.getByPlaceholderText("Pattern"), "foo");
    await userEvent.type(screen.getByPlaceholderText("Output Name"), "bar");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onRemove when remove is clicked", async () => {
    const onRemove = vi.fn();
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="jsonpath"
        pattern=""
        name=""
        onChange={() => {}}
        onRemove={onRemove}
        idx = {0}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /remove output rule/i }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("disables remove button if disableRemove is true", () => {
    render(
      <OutputRuleRow
        id={uuidv4()}
        type="jsonpath"
        pattern=""
        name=""
        onChange={() => {}}
        onRemove={() => {}}
        idx = {0}
        disableRemove={true}
      />
    );
    expect(screen.getByRole("button", { name: /remove output rule/i })).toBeDisabled();
  });
});
