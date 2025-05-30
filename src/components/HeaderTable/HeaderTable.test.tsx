import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { HeaderTable } from "./HeaderTable";
import type { Header } from "./HeaderTable.types";
import { v4 as uuidv4 } from "uuid";

describe("HeaderTable", () => {
  const id1 = uuidv4();
  const id2 = uuidv4();

  const initialHeaders: Header[] = [
    { id: id1, name: "X-Test", value: "123" },
    { id: id2, name: "X-Bar", value: "abc" },
  ];

  it("renders all headers", () => {
    render(<HeaderTable headers={initialHeaders} onChange={() => {}} />);
    expect(screen.getAllByPlaceholderText(/name/i).length).toBe(2);
    expect(screen.getAllByPlaceholderText(/value/i).length).toBe(2);
  });

  it("calls onChange and updates header when edited", async () => {
    const setHeaders = vi.fn(() => {});
    function Wrapper({ initialHeaders }: { initialHeaders: Header[] }) {
      const [headers, setLocalHeaders] = React.useState(initialHeaders);
      return <HeaderTable headers={headers} onChange={x => { setHeaders(); setLocalHeaders(x); }} />;
    }
    render(<Wrapper initialHeaders={initialHeaders} />);
    const inputs = screen.getAllByPlaceholderText(/name/i);
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], "X-Foo");
    expect(setHeaders).toHaveBeenCalled();
    expect(inputs[0]).toHaveValue("X-Foo");
  });

  it("adds a new header row", async () => {
    const handleChange = vi.fn();
    render(<HeaderTable headers={[{ id: uuidv4(), name: "", value: "" }]} onChange={handleChange} />);
    await userEvent.click(screen.getByRole("button", { name: /add header/i }));
    expect(handleChange).toHaveBeenCalled();
  });

  it("removes a header row", async () => {
    const handleChange = vi.fn();
    render(<HeaderTable headers={initialHeaders} onChange={handleChange} />);
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await userEvent.click(removeButtons[1]);
    expect(handleChange).toHaveBeenCalled();
  });
});
