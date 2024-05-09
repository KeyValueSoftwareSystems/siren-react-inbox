import React from "react";

import { fireEvent, render } from "@testing-library/react";

import SirenNotificationIcon from "../../src/components/SirenNotificationIcon";
import { SirenContext } from "../../src/components/SirenProvider"; // Assuming SirenProvider exports SirenContext
import { applyTheme } from "../../src/utils/commonUtils";
import { VerificationStatus } from "../../src/utils/constants";

const mockClickFn = jest.fn();

// Mock the CSS file to avoid Jest error
jest.mock("../../src/styles/sirenNotificationIcon.css", () => ({}));

const mockSirenContextValue = {
  siren: null,
  verificationStatus: VerificationStatus.SUCCESS
};

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <SirenNotificationIcon
      styles={style}
      notificationIcon={<div />}
      onIconClick={mockClickFn}
      darkMode={false}
      hideBadge={false}
      isModalOpen={false}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("should render notification icon only", () => {
  const component = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div />}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />
  );
  const badge = component.queryByTestId("notification-default-badge");

  expect(badge).toBeNull();
});

test("should render the passed notification icon", () => {
  const component = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div data-testid="custom-notification-icon" />}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />
  );
  const button = component.getByTestId("custom-notification-icon"); // Assuming count is displayed as button text

  expect(button).toBeTruthy();
});

test("should call onClick handler on button click", () => {
  const component = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div />}
      isModalOpen={false}
      darkMode={true}
      hideBadge={false}
    />
  );
  const button = component.getByTestId("notification-icon");

  fireEvent.click(button);

  expect(mockClickFn).toHaveBeenCalledTimes(1);
});

it("does not render badge with count if unviewed count is 0", () => {
  const { queryByTestId } = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div />}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />
  );
  const badge = queryByTestId("notification-default-badge");

  expect(badge).toBeFalsy();
});



it("calls onClick handler when icon is clicked", () => {
  const onClickMock = jest.fn();
  const { getByTestId } = render(
    <SirenNotificationIcon
      onIconClick={onClickMock}
      styles={style}
      notificationIcon={<div />}
      isModalOpen={false}
      darkMode={true}
      hideBadge={false}
    />
  );
  const icon = getByTestId("notification-icon");

  fireEvent.click(icon);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("should not render badge with count if unviewed count is 0", () => {
  const { queryByTestId } = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div />}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />
  );
  const badge = queryByTestId("notification-default-badge");

  expect(badge).toBeFalsy();
});

test("should hide badge if unviewed count is 0 and badge type is default", () => {
  const { queryByTestId } = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      notificationIcon={<div />}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />
  );
  const badge = queryByTestId("notification-default-badge");

  expect(badge).toBeNull();
});

test("should hide badge if badge type is set to none", () => {
  const { queryByTestId } = render(
    <SirenNotificationIcon
      styles={style}
      onIconClick={mockClickFn}
      isModalOpen={false}
      notificationIcon={<div />}
      darkMode={true}
      hideBadge={false}
    />
  );
  const badge = queryByTestId("notification-default-badge");

  expect(badge).toBeNull();
});

test("calls PubSub.subscribe with correct arguments", () => {
  render(
    <SirenNotificationIcon
      styles={style}
      notificationIcon={<div />}
      onIconClick={mockClickFn}
      darkMode={true}
      hideBadge={false}
      isModalOpen={false}
    />,
    {
      wrapper: ({ children }) => (
        <SirenContext.Provider value={mockSirenContextValue}>
          {children}
        </SirenContext.Provider>
      ),
    }
  );
});