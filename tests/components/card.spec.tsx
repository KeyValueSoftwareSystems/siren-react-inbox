import React from "react";

import { act, fireEvent, render } from "@testing-library/react";

import Card from "../../src/components/Card";
import { applyTheme } from "../../src/utils/commonUtils";

const mockNotification = {
  id: "1",
  createdAt: "",
  message: {
    header: "New Message",
    body: "You have a new message.",
    channel: "watsapp",
    subHeader: "New post",
    actionUrl: "",
    additionalData: "",
    avatar: {
      imageUrl: "",
      actionUrl: "",
    },
  },
  requestId: "123",
  isRead: false,
};

const mockDeleteNotificationById = jest.fn();
const mockOnNotificationCardClick = jest.fn();

// Mock the CSS file to avoid Jest error
jest.mock("../../src/styles/card.css", () => ({}));

const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
      darkMode={false}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
test("renders notification card with basic content", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
      darkMode={false}
    />
  );

  expect(screen.getByTestId("card-1")).toBeDefined();
});

test("triggers delete notification callback on delete button click", () => {

  jest.useFakeTimers();

  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
      darkMode={false}
    />
  );

  const deleteButton = screen.getByTestId("delete-1");

  fireEvent.click(deleteButton);

  act(() => {
    jest.advanceTimersByTime(200);
  });

  expect(mockDeleteNotificationById).toHaveBeenCalledWith("1");

  jest.useRealTimers();
});

test("triggers notification card click callback on card click", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{ hideAvatar: true }}
      styles={style}
      darkMode={false}
    />
  );

  const card = screen.getByTestId("card-1");

  fireEvent.click(card);
  expect(mockOnNotificationCardClick).toHaveBeenCalledWith(mockNotification);
});

test("renders header, subheader, and body", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
      darkMode={false}
    />
  );

  const header = screen.getByText(mockNotification.message.header);
  const subHeader = screen.getByText(mockNotification.message.subHeader);
  const body = screen.getByText(mockNotification.message.body);

  expect(header).toBeTruthy();
  expect(subHeader).toBeTruthy();
  expect(body).toBeTruthy();
});

test("does not render avatar if hideAvatar is true", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{ hideAvatar: true }}
      styles={style}
      darkMode={false}
    />
  );

  const avatarContainer = screen.queryByTestId("avatar-container");

  expect(avatarContainer).toBeNull();
});
