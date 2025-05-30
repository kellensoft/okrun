import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { HeaderRow } from "./HeaderRow";
import { v4 as uuidv4 } from "uuid";

describe("HeaderRow", () => {

  it("renders inputs and remove button", () => {
    render(
      <HeaderRow
        id={uuidv4()}
        name=""
        value=""
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
      />
    );
    expect(screen.getByLabelText("Header Name 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Header Value 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove header 1" })).toBeInTheDocument();
  });

  it("calls onChange when name is changed", async () => {
    const handleChange = vi.fn();
    render(
      <HeaderRow
        id={uuidv4()}
        name=""
        value=""
        onChange={handleChange}
        onRemove={() => {}}
        idx={0}
      />
    );
    await userEvent.type(screen.getByLabelText("Header Name 1"), "X-Foo");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onRemove when clicked", async () => {
    const handleRemove = vi.fn();
    render(
      <HeaderRow
        id={uuidv4()}
        name=""
        value=""
        onChange={() => {}}
        onRemove={handleRemove}
        idx={0}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove header 1" }));
    expect(handleRemove).toHaveBeenCalled();
  });

  it("disables remove button if disableRemove is true", () => {
    render(
      <HeaderRow
        id={uuidv4()}
        name=""
        value=""
        onChange={() => {}}
        onRemove={() => {}}
        disableRemove
        idx={0}
      />
    );
    expect(screen.getByRole("button", { name: "Remove header 1" })).toBeDisabled();
  });

  it("shows error when name missing", () => {
    render(
      <HeaderRow
        id={uuidv4()}
        name=""
        value=""
        error="Name required"
        onChange={() => {}}
        onRemove={() => {}}
        idx={0}
      />
    );
    expect(screen.getByText(/name required/i)).toBeInTheDocument();
  });
});