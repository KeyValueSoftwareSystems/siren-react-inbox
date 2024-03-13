import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ErrorWindow from "../../src/components/errorWindow";
import { applyTheme } from "../../src/utils/commonUtils";
const mockRefreshFunction = jest.fn();
const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <ErrorWindow onRefresh={mockRefreshFunction} styles={style} />
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renders errror window with basic content", () => {
  const screen = render(
    <ErrorWindow onRefresh={mockRefreshFunction} styles={style} />
  );

  expect(screen.getByTestId("error-window")).toBeDefined();
});

test("triggers delete notification callback on delete button click", () => {
  const screen = render(
    <ErrorWindow onRefresh={mockRefreshFunction} styles={style} />
  );
  const refreshButton = screen.getByTestId("refresh-button");

  fireEvent.click(refreshButton);
  expect(mockRefreshFunction).toHaveBeenCalled();
});