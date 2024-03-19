import React from "react";

import {  queryByAttribute, render } from "@testing-library/react";

import ShowMore from "../../src/components/ShowMore";
import { applyTheme } from "../../src/utils/commonUtils";

const mockfn = jest.fn();

// Mock the CSS file to avoid Jest error
jest.mock('../../src/styles/showMore.css', () => ({}));

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <ShowMore
      loadMoreLabel={"dummy-title"}
      styles={style}
      customComponent={<div></div>}
      onClick={mockfn}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});