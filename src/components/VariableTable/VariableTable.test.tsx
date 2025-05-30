import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { VariableTable } from "./VariableTable";
import { v4 as uuidv4 } from "uuid";

describe("VariableTable", () => {
  it("renders initial variables", () => {
    render(
      <VariableTable
        variables={[{id: uuidv4(), name: "a", value: "1", pattern: "" }]}
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Input Name 1")).toHaveValue("a");
    expect(screen.getByLabelText("Input Value 1")).toHaveValue("1");
  });

  it("adds a new variable row when clicking Add Variable", async () => {
    const handleChange = vi.fn();
    const id = uuidv4();
    render(
      <VariableTable
        variables={[{id: id, name: "a", value: "1", pattern: "" }]}
        onChange={handleChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /add input variable/i }));
    expect(handleChange).toHaveBeenCalled();
    const [[newVariables]] = handleChange.mock.calls;
    expect(newVariables[0]).toEqual({ id, name: "a", value: "1", pattern: "" });
    expect(newVariables[1].name).toBe("");
    expect(newVariables[1].value).toBe("");
    expect(newVariables[1].pattern).toBe("");
    expect(typeof newVariables[1].id).toBe("string");
    expect(newVariables[1].id).not.toBe(""); 
  });

  it("removes a variable row", async () => {
    const handleChange = vi.fn();
    const id = uuidv4();
    render(
      <VariableTable
        variables={[
          { id: uuidv4(), name: "a", value: "1", pattern: "" },
          { id: id, name: "b", value: "2", pattern: "" },
        ]}
        onChange={handleChange}
      />
    );
    const removeButtons = screen.getAllByRole("button", { name: /remove input variable/i });
    await userEvent.click(removeButtons[0]);
    expect(handleChange).toHaveBeenCalledWith([
      { id: id, name: "b", value: "2", pattern: "" },
    ]);
  });
});
