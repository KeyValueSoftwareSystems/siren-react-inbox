import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "../../src/components/card";
import { applyTheme } from "../../src/utils/commonUtils";

const mockNotification = {
  id: "1",
  createdAt: "2024-02-24T12:00:00Z",
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
const style = applyTheme();

test("matches snapshot", () => {
  const { asFragment } = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
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
    />
  );

  expect(screen.getByTestId("card-1")).toBeDefined();
});

test("triggers delete notification callback on delete button click", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{}}
      styles={style}
    />
  );
  const deleteButton = screen.getByTestId("delete-1");

  fireEvent.click(deleteButton);
  expect(mockDeleteNotificationById).toHaveBeenCalledWith("1");
});

test("triggers notification card click callback on card click", () => {
  const screen = render(
    <Card
      notification={mockNotification}
      deleteNotificationById={mockDeleteNotificationById}
      onNotificationCardClick={mockOnNotificationCardClick}
      cardProps={{ hideAvatar: true }}
      styles={style}
    />
  );

  const card = screen.getByTestId("card-1");

  fireEvent.click(card);
  expect(mockOnNotificationCardClick).toHaveBeenCalledWith(mockNotification);
});