import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RequestBodyEditor } from "./RequestBodyEditor";

describe("RequestBodyEditor", () => {
  it("renders textarea and label", () => {
    render(<RequestBodyEditor value="" variables={[]} onChange={() => {}} />);
    expect(screen.getByLabelText(/request body/i)).toBeInTheDocument();
  });

  it("calls onChange when value changes", async () => {
    const handleChange = vi.fn();
    render(<RequestBodyEditor value="" variables={[]} onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText(/request body/i), "foo");
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows missing variable warning", () => {
    render(
      <RequestBodyEditor
        value='{"id": "{{foo}}"}'
        variables={["bar"]}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/missing variables/i)).toBeInTheDocument();
    const missingWarning = screen.getByText(/missing variables/i);
    expect(within(missingWarning.parentElement!).getByText("foo")).toBeInTheDocument();
  });

  it("shows unused variable warning", () => {
    render(
      <RequestBodyEditor
        value='{"id": "{{foo}}"}'
        variables={["foo", "bar"]}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/unused variables/i)).toBeInTheDocument();
    expect(screen.getByText(/bar/)).toBeInTheDocument();
  });
});
