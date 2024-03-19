import React from "react";

import { render } from "@testing-library/react";

import EmptyList from "../../src/components/EmptyList";
import { applyTheme } from "../../src/utils/commonUtils";

// Mock the CSS file to avoid Jest error
jest.mock('../../src/styles/emptyList.css', () => ({}));

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(<EmptyList styles={style} darkMode/>);

  expect(asFragment()).toMatchSnapshot();
});
