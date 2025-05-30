import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EndpointMethodInput } from "./EndpointMethodInput";

describe("EndpointMethodInput", () => {
  it("renders url input and method select", () => {
    render(
      <EndpointMethodInput url="" method="GET" onChange={() => {}} />
    );
    expect(screen.getByPlaceholderText(/https?:\/\//i)).toBeInTheDocument();
    expect(screen.getByLabelText(/HTTP Method/i)).toBeInTheDocument();
  });

  it("calls onChange when url changes", async () => {
    const onChange = vi.fn();
    render(
      <EndpointMethodInput url="" method="GET" onChange={onChange} />
    );
    await userEvent.type(screen.getByPlaceholderText(/https?:\/\//i), "http://foo");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onChange when method changes", async () => {
    const onChange = vi.fn();
    render(
      <EndpointMethodInput url="http://foo" method="GET" onChange={onChange} />
    );
    await userEvent.selectOptions(screen.getByLabelText(/HTTP Method/i), "POST");
    expect(onChange).toHaveBeenCalledWith({ url: "http://foo", method: "POST" });
  });

  it("shows error for invalid url", () => {
    render(
      <EndpointMethodInput url="!!invalid-url" method="GET" onChange={() => {}} />
    );
    expect(screen.getByText(/invalid url/i)).toBeInTheDocument();
  });
});
