import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DelayInput } from "./DelayInput";

function Wrapper() {
  const [value, setValue] = useState<number | "">("");
  return <DelayInput value={value} onChange={setValue} />;
}

describe("DelayInput", () => {
  it("renders with initial value", () => {
    render(<DelayInput value={1000} onChange={() => {}} />);
    expect(screen.getByLabelText(/delay/i)).toHaveValue(1000);
  });

  it("calls onChange with number on valid input", async () => {
    render(<Wrapper />);
    const input = screen.getByLabelText(/delay/i);
    await userEvent.type(input, "500");
    expect(input).toHaveValue(500);
  });

  it("shows error on negative input", () => {
    render(<DelayInput value={-10} onChange={() => {}} />);
    expect(screen.getByText(/non-negative/i)).toBeInTheDocument();
  });

  it("allows empty input", async () => {
    const handleChange = vi.fn();
    render(<DelayInput value={100} onChange={handleChange} />);
    const input = screen.getByLabelText(/delay/i);
    await userEvent.clear(input);
    expect(handleChange).toHaveBeenCalledWith("");
  });
});
