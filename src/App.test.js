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

test("with hover/focus the tooltip text does appear", async () => {
  global.ResizeObserver = class ResizeObserver {
    constructor(cb) {
      this.cb = cb;
    }
    observe() {
      this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
    }
    unobserve() {}
    disconnect() {}
  };

  render(<App />);
  await userEvent.hover(screen.getByText(/learn react/i));
  const tooltipText = await screen.findAllByText("https://reactjs.org");
  expect(tooltipText).toBeTruthy();
});
