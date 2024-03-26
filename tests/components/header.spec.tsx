import React from "react";

import { fireEvent, queryByAttribute, render } from "@testing-library/react";

import Header from "../../src/components/Header";
import { applyTheme } from "../../src/utils/commonUtils";

const getById = queryByAttribute.bind(null, "data-testid");
const mockReClearAllFunction = jest.fn();

// Mock the CSS file to avoid Jest error
jest.mock('../../src/styles/header.css', () => ({}));

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <Header
      title={"dummy-title"}
      styles={style}
      enableClearAll={true}
      hideClearAll={false}
      fullScreen={false}
      handleClearAllNotification={mockReClearAllFunction}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renders header with basic content", () => {
  const screen = render(
    <Header
      title={"dummy-title"}
      styles={style}
      enableClearAll={true}
      hideClearAll={false}
      fullScreen={false}
      handleClearAllNotification={mockReClearAllFunction}
    />
  );

  expect(screen.getByTestId("header")).toBeDefined();
});

test("triggers handleClearAllNotification callback on clear all button click", () => {
  const screen = render(
    <Header
      title={"dummy-title"}
      styles={style}
      enableClearAll={true}
      hideClearAll={false}
      fullScreen={false}
      handleClearAllNotification={mockReClearAllFunction}
    />
  );
  const refreshButton = screen.getByTestId("clear-all");

  fireEvent.click(refreshButton);
  expect(mockReClearAllFunction).toHaveBeenCalled();
});

test("should not render clear all button", () => {
  const screen = render(
    <Header
      title={"dummy-title"}
      styles={style}
      enableClearAll={false}
      hideClearAll={true}
      fullScreen={true}
      handleClearAllNotification={mockReClearAllFunction}
    />
  );
  const refreshButton = getById(screen.container, "clear-all");

  expect(refreshButton).toBeFalsy();
});