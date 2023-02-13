import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("has tooltip", () => {
  render(<App />);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});

test("without hover/focus on button the tooltip text does not appear", () => {
  render(<App />);
  expect(screen.queryByText("https://reactjs.org")).not.toBeInTheDocument();
});

test("with hover/focus the tooltip text does appear", () => {
  render(<App />);
  userEvent.hover(screen.getByText(/learn react/i));
  expect(screen.getByText("https://reactjs.org")).toBeInTheDocument();
});

test("with hover/focus the tooltip text does appear async", async () => {
  render(<App />);
  userEvent.hover(screen.getByText(/learn react/i));
  const tooltipText = await screen.findByText("https://reactjs.org");
  expect(tooltipText).toBeInTheDocument();
});
