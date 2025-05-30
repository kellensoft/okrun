import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { VariableRow } from "./VariableRow";
import { v4 as uuidv4 } from "uuid";

describe("VariableRow", () => {
  it("renders all input fields", () => {
    render(
      <VariableRow
        id={uuidv4()}
        name=""
        value=""
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
      />
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pattern (optional)")).toBeInTheDocument();
  });

  it("shows error on empty name", () => {
    render(
      <VariableRow
        id={uuidv4()} 
        name=""
        value=""
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
      />
    );
    expect(screen.getByText("Name required")).toBeInTheDocument();
  });

  it("shows error on duplicate name", () => {
    render(
      <VariableRow
        id={uuidv4()}
        name="foo"
        value="bar"
        error="Duplicate name"
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
      />
    );
    expect(screen.getByText("Duplicate name")).toBeInTheDocument();
  });

  it("calls onChange when name/value/pattern change", async () => {
    const onChange = vi.fn();
    render(
      <VariableRow
        id={uuidv4()}
        name="foo"
        value="bar"
        pattern=""
        onChange={onChange}
        onRemove={() => {}}
        idx={0}
      />
    );
    await userEvent.type(screen.getByPlaceholderText("Name"), "z");
    expect(onChange).toHaveBeenCalled();
    await userEvent.type(screen.getByPlaceholderText("Value"), "z");
    expect(onChange).toHaveBeenCalled();
    await userEvent.type(screen.getByPlaceholderText("Pattern (optional)"), "z");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onRemove when remove is clicked", async () => {
    const onRemove = vi.fn();
    render(
      <VariableRow
        id={uuidv4()}
        name="foo"
        value="bar"
        onChange={() => {}}
        onRemove={onRemove}
        idx={0}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /remove input variable/i }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("disables remove button if disableRemove is true", () => {
    render(
      <VariableRow
        id={uuidv4()}
        name="foo"
        value="bar"
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
        disableRemove={true}
      />
    );
    expect(screen.getByRole("button", { name: /remove input variable/i })).toBeDisabled();
  });
});
