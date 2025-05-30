import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { OutputRuleTable } from "./OutputRuleTable";
import { v4 as uuidv4 } from "uuid";

describe("OutputRuleTable", () => {
  it("renders initial rules", () => {
    render(
      <OutputRuleTable
        rules={[{id: uuidv4(), type: "jsonpath", pattern: "foo", name: "result" }]}
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Extraction Type 1")).toHaveValue("jsonpath");
    expect(screen.getByLabelText("Extraction Pattern 1")).toHaveValue("foo");
    expect(screen.getByLabelText("Output Name 1")).toHaveValue("result");
  });

  it("adds a new rule when Add Rule is clicked", async () => {
    const handleChange = vi.fn();
    const id = uuidv4();
    render(
      <OutputRuleTable
        rules={[{id: id, type: "jsonpath", pattern: "foo", name: "result" }]}
        onChange={handleChange}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /add output extraction rule/i }));
    expect(handleChange).toHaveBeenCalled();
    const [[newVariables]] = handleChange.mock.calls;
    expect(newVariables[0]).toEqual({ id: id, type: "jsonpath", pattern: "foo", name: "result"  });
    expect(newVariables[1].name).toBe("");
    expect(newVariables[1].pattern).toBe("");
    expect(newVariables[1].type).toBe("jsonpath");
    expect(typeof newVariables[1].id).toBe("string");
    expect(newVariables[1].id).not.toBe(""); 
  });

  it("removes a rule row", async () => {
    const handleChange = vi.fn();
    const id = uuidv4();
    render(
      <OutputRuleTable
        rules={[
          {id: uuidv4(), type: "jsonpath", pattern: "foo", name: "result" },
          {id: id, type: "regex", pattern: "bar", name: "other" },
        ]}
        onChange={handleChange}
      />
    );
    const removeButtons = screen.getAllByRole("button", { name: /remove output rule/i });
    await userEvent.click(removeButtons[0]);
    expect(handleChange).toHaveBeenCalledWith([
      {id: id, type: "regex", pattern: "bar", name: "other" },
    ]);
  });
});
