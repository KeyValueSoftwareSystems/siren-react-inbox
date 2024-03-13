import React from "react";
import { render } from "@testing-library/react";
import EmptyList from "../../src/components/emptyList";
import { applyTheme } from "../../src/utils/commonUtils";

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(<EmptyList styles={style} />);

  expect(asFragment()).toMatchSnapshot();
});