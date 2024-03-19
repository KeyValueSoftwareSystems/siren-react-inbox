import React from "react";

import { render } from "@testing-library/react";

import ErrorWindow from "../../src/components/ErrorWindow";
import { applyTheme } from "../../src/utils/commonUtils";

// Mock the CSS file to avoid Jest error
jest.mock('../../src/styles/errorWindow.css', () => ({}));

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <ErrorWindow darkMode styles={style} error="" />
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renders errror window with basic content", () => {
  const screen = render(
    <ErrorWindow darkMode styles={style} error="failed" />
  );

  expect(screen.getByTestId("error-window")).toBeDefined();
});
