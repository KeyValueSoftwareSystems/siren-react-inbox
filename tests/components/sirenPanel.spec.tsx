import React from "react";

import { render, waitFor } from "@testing-library/react";

import SirenPanel from "../../src/components/SirenPanel"; // Adjust the import path accordingly
import { applyTheme } from "../../src/utils/commonUtils";

// Mock the CSS files to avoid Jest error
jest.mock("../../src/styles/sirenNotificationIcon.css", () => ({}));
jest.mock("../../src/styles/header.css", () => ({}));
jest.mock("../../src/styles/card.css", () => ({}));
jest.mock("../../src/styles/loader.css", () => ({}));
jest.mock("../../src/styles/emptyList.css", () => ({}));
jest.mock("../../src/styles/errorWindow.css", () => ({}));
jest.mock("../../src/styles/sirenPanel.css", () => ({}));
jest.mock("../../src/styles/showMore.css", () => ({}));

const mockErrorFn = jest.fn();
const style = applyTheme();

const props = {
  styles: style,
  title: "Notifications",
  inboxHeaderProps: { hideHeader: false},
  cardProps: { hideAvatar: false, showMedia: true },
  customFooter: undefined,
  customHeader: undefined,
  onNotificationCardClick: undefined,
  customNotificationCard: undefined,
  onError: mockErrorFn,
  listEmptyComponent: undefined,
  noOfNotificationsPerFetch: 10,
  fullScreen: false,
  setModalVisible: jest.fn(),
  darkMode: false,
  modalWidth: 500,
};

test("matches snapshot", () => {
  const { asFragment } = render(<SirenPanel {...props} />);

  expect(asFragment()).toMatchSnapshot();
});

it("renders title when provided", () => {
  const { getByText } = render(<SirenPanel {...props} inboxHeaderProps={{title: "Notifications"}} />);
  const title = getByText("Notifications");

  expect(title).toBeTruthy();
});

it("hides header when hideHeader prop is true", () => {
  const inboxHeaderProps = {hideHeader: true}
  const { queryByText } = render(<SirenPanel {...props} inboxHeaderProps={inboxHeaderProps} />);
  const header = queryByText("Notifications");

  expect(header).toBeFalsy();
});

it("renders custom header when provided", () => {
  const customHeader = <div data-testid="custom-header">Custom Header</div>;
  const inboxHeaderProps = {customHeader}
  const { getByTestId } = render(
    <SirenPanel {...props} inboxHeaderProps={inboxHeaderProps} />
  );
  const header = getByTestId("custom-header");

  expect(header).toBeTruthy();
});

it("calls onError callback if an error occurs", async () => {
  // Mocking an error response from the server
  jest.spyOn(global, "fetch").mockRejectedValueOnce({
    json: async () => ({
      Code: "OUTSIDE_SIREN_CONTEXT",
      Message: "Trying to invoke function outside the siren context",
      Type: "ERROR",
    }),
  });
  render(<SirenPanel {...props} />);
  await waitFor(() => {
    expect(mockErrorFn).toHaveBeenCalledWith({
      Code: "OUTSIDE_SIREN_CONTEXT",
      Message: "Trying to invoke function outside the siren context",
      Type: "ERROR",
    });
  });
});
